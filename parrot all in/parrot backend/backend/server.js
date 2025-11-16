require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const dbUrl = process.env.DATABASE_URL;
mongoose.connect(dbUrl)
  .then(() => console.log('MongoDB veritabanına başarıyla bağlanıldı! 🐘'))
  .catch((err) => console.error('Veritabanı bağlantı hatası:', err));

// --- Veri Modelleri (Schemas) ---

const transactionSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true },
  ethAmount: { type: String, required: true },
  parrotTokensBought: { type: Number, required: true },
  txHash: { type: String, required: true, unique: true },
  referredByCode: { type: String, default: null },
  // YENİ: Bu işlemden referans verenin kazandığı komisyon (token olarak)
  commissionEarnedInTokens: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true, lowercase: true },
  referralCode: { type: String, required: true, unique: true },
  referredUsers: [{ type: String, lowercase: true }],
  // YENİ: Kullanıcının referanslardan kazandığı toplam token miktarı
  totalTokensEarned: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

const authenticateAdmin = (req, res, next) => {
    const adminPassword = req.headers['admin-password'];
    if (adminPassword && adminPassword === process.env.ADMIN_PASSWORD) {
        next();
    } else {
        res.status(401).json({ message: 'Yetkisiz erişim.' });
    }
};
function generateReferralCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// --- API ENDPOINT'LERİ ---

app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Backend sunucusu başarıyla çalışıyor!' });
});

app.post('/api/get-referral-code', async (req, res) => {
    try {
        const { walletAddress } = req.body;
        if (!walletAddress) return res.status(400).json({ message: 'Cüzdan adresi gerekli.' });
        const lowerCaseAddress = walletAddress.toLowerCase();
        let user = await User.findOne({ walletAddress: lowerCaseAddress });
        if (user) {
            return res.status(200).json({ referralCode: user.referralCode });
        }
        let newCode;
        let isCodeUnique = false;
        while (!isCodeUnique) {
            newCode = generateReferralCode();
            if (!(await User.findOne({ referralCode: newCode }))) {
                isCodeUnique = true;
            }
        }
        const newUser = new User({ walletAddress: lowerCaseAddress, referralCode: newCode });
        await newUser.save();
        return res.status(201).json({ referralCode: newUser.referralCode });
    } catch (error) {
        console.error('Referans kodu alınırken hata:', error);
        res.status(500).json({ message: 'Sunucu hatası oluştu.' });
    }
});

// GÜNCELLENDİ: Komisyon hesaplama ve kaydetme mantığı eklendi
app.post('/api/transaction', async (req, res) => {
  try {
    const { walletAddress, ethAmount, txHash, referralCode, parrotTokensBought } = req.body;
    if (!walletAddress || !ethAmount || !txHash || parrotTokensBought === undefined) {
      return res.status(400).json({ message: 'Eksik bilgi gönderildi.' });
    }

    let commissionEarned = 0;
    const commissionRate = 0.20; // %20 komisyon oranı

    if (referralCode) {
      const referrer = await User.findOne({ referralCode: referralCode });
      if (referrer && referrer.walletAddress !== walletAddress.toLowerCase()) {
        // Komisyonu hesapla
        commissionEarned = parrotTokensBought * commissionRate;
        
        // Referans verenin toplam kazancını güncelle
        referrer.totalTokensEarned = (referrer.totalTokensEarned || 0) + commissionEarned;
        
        // Getirdiği kullanıcı listesini güncelle (eğer daha önce eklenmemişse)
        if (!referrer.referredUsers.includes(walletAddress.toLowerCase())) {
            referrer.referredUsers.push(walletAddress.toLowerCase());
        }
        
        await referrer.save();
        console.log(`Referans güncellendi: ${referrer.walletAddress} kullanıcısı bu işlemden ${commissionEarned} token kazandı.`);
      }
    }

    const newTransaction = new Transaction({ 
      walletAddress, 
      ethAmount, 
      txHash,
      parrotTokensBought,
      referredByCode: referralCode,
      commissionEarnedInTokens: commissionEarned // Hesaplanan komisyonu işleme kaydet
    });
    await newTransaction.save();
    
    console.log('--- Yeni Yatırım Veritabanına Kaydedildi ---');
    console.log(`Cüzdan Adresi: ${walletAddress}`);
    console.log(`Satın Alınan Token: ${parrotTokensBought}`);
    console.log(`Referans Kazancı: ${commissionEarned} Token`);
    console.log('-------------------------------------------');
    res.status(200).json({ message: 'İşlem bilgisi veritabanına başarıyla kaydedildi.' });

  } catch (error) {
    console.error('Veri kaydetme hatası:', error.message);
    if (error.code === 11000) {
        return res.status(409).json({ message: 'Bu işlem (txHash) daha önce kaydedilmiş.' });
    }
    res.status(500).json({ message: 'Veri kaydedilirken bir hata oluştu.' });
  }
});

// GÜNCELLENDİ: Artık toplam kazanılan token miktarını da döndürüyor
app.get('/api/referral-stats/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params;
    if (!walletAddress) return res.status(400).json({ message: 'Cüzdan adresi gerekli.' });

    const user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (!user) {
      // Kullanıcı bulunamazsa, panelde hata olmaması için varsayılan boş veri döndür.
      return res.status(200).json({
        referredUsersCount: 0,
        totalTokensEarned: 0,
      });
    }

    res.status(200).json({
      referredUsersCount: user.referredUsers.length,
      totalTokensEarned: user.totalTokensEarned || 0, // Eğer değer yoksa 0 döndür
    });

  } catch (error) {
    console.error('Referans istatistikleri alınırken hata:', error);
    res.status(500).json({ message: 'Referans istatistikleri alınırken bir hata oluştu.' });
  }
});

// Admin Paneli API'leri
app.get('/api/transactions', authenticateAdmin, async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ timestamp: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'İşlemler alınırken hata oluştu.'});
  }
});

app.get('/api/stats', authenticateAdmin, async (req, res) => {
  try {
    const totalTransactions = await Transaction.countDocuments();
    const totalInvestors = await Transaction.distinct('walletAddress').then(wallets => wallets.length);
    res.status(200).json({ totalTransactions, totalInvestors });
  } catch(error) {
    res.status(500).json({ message: 'İstatistikler alınırken hata oluştu.'});
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend sunucusu http://localhost:${PORT} adresinde başlatıldı.`);
});
