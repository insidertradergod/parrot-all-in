import React, { useState, useEffect } from 'react';

// Backend sunucumuzun adresleri
const STATS_URL = 'http://localhost:3001/api/stats';
const TRANSACTIONS_URL = 'http://localhost:3001/api/transactions';

const AdminPage = () => {
  // --- State (Durum) Değişkenleri ---
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [stats, setStats] = useState({
    totalTransactions: 0,
    uniqueInvestors: 0,
    totalEthRaised: 0,
  });
  const [transactions, setTransactions] = useState([]);

  // Sayfa yüklendiğinde, daha önce girilmiş bir anahtar var mı diye kontrol et
  useEffect(() => {
    const savedKey = localStorage.getItem('adminSecretKey');
    if (savedKey) {
      setSecretKey(savedKey);
      fetchData(savedKey);
    }
  }, []);


  // --- Veri Çekme Fonksiyonu ---
  const fetchData = async (key: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Önce istatistikleri çekmeyi dene. Şifre yanlışsa bu istek hata verecek.
      const statsResponse = await fetch(STATS_URL, {
        headers: { 'Authorization': key },
      });

      if (!statsResponse.ok) {
        throw new Error('Giriş başarısız. Gizli anahtar geçersiz veya sunucu hatası.');
      }
      
      const statsData = await statsResponse.json();
      setStats(statsData);

      // İstatistikler başarılıysa, işlem listesini de çek.
      const txResponse = await fetch(TRANSACTIONS_URL, {
        headers: { 'Authorization': key },
      });
      const txData = await txResponse.json();
      setTransactions(txData);
      
      // Her şey başarılıysa, giriş yapıldı olarak işaretle ve anahtarı kaydet.
      setIsAuthenticated(true);
      localStorage.setItem('adminSecretKey', key);

    } catch (err: any) {
      setError(err.message);
      setIsAuthenticated(false);
      localStorage.removeItem('adminSecretKey');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretKey) {
      fetchData(secretKey);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSecretKey');
    setIsAuthenticated(false);
    setSecretKey('');
  };


  // --- GİRİŞ YAPILMADIYSA GÖSTERİLECEK EKRAN ---
  if (!isAuthenticated) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginBox}>
          <h2>Admin Paneli Giriş</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Gizli Anahtarı Girin"
              style={styles.input}
            />
            <button type="submit" disabled={isLoading} style={styles.button}>
              {isLoading ? 'Kontrol Ediliyor...' : 'Giriş Yap'}
            </button>
          </form>
          {error && <p style={styles.error}>{error}</p>}
        </div>
      </div>
    );
  }

  // --- GİRİŞ YAPILDIYSA GÖSTERİLECEK EKRAN (DASHBOARD) ---
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Admin Paneli</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>Çıkış Yap</button>
      </div>

      {/* İstatistik Kutuları */}
      <div style={styles.statsContainer}>
        <div style={styles.statBox}>
          <h3>Toplam Toplanan</h3>
          <p>{stats.totalEthRaised.toFixed(4)} ETH</p>
        </div>
        <div style={styles.statBox}>
          <h3>Toplam Yatırım Sayısı</h3>
          <p>{stats.totalTransactions}</p>
        </div>
        <div style={styles.statBox}>
          <h3>Benzersiz Yatırımcı</h3>
          <p>{stats.uniqueInvestors}</p>
        </div>
      </div>

      {/* İşlem Tablosu */}
      <h2>Son Yatırımlar</h2>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Tarih</th>
              <th style={styles.th}>Cüzdan Adresi</th>
              <th style={styles.th}>Miktar (ETH)</th>
              <th style={styles.th}>İşlem Hash'i</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx: any) => (
                <tr key={tx._id}>
                  <td style={styles.td}>{new Date(tx.timestamp).toLocaleString()}</td>
                  <td style={styles.td}>{tx.walletAddress}</td>
                  <td style={styles.td}>{tx.ethAmount}</td>
                  <td style={styles.td}>
                    <a href={`https://etherscan.io/tx/${tx.txHash}`} target="_blank" rel="noopener noreferrer">
                      {`${tx.txHash.substring(0, 6)}...${tx.txHash.substring(tx.txHash.length - 4)}`}
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{...styles.td, textAlign: 'center'}}>Henüz yatırım bulunmuyor.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


// --- Basit Stil Tanımları (CSS dosyası yerine) ---
const styles: { [key: string]: React.CSSProperties } = {
  // ... (Tüm stil kodları aşağıda) ...
};
// Stil kodlarını ayrı bir yerde tutarak okunabilirliği artırıyoruz.
Object.assign(styles, {
  loginContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f0f2f5' },
  loginBox: { padding: '2rem', background: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center' },
  input: { width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' },
  button: { width: '100%', padding: '0.75rem', border: 'none', borderRadius: '4px', background: '#007bff', color: 'white', fontSize: '1rem', cursor: 'pointer' },
  error: { color: 'red', marginTop: '1rem' },
  container: { padding: '2rem', fontFamily: 'sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  logoutButton: { padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', background: '#dc3545', color: 'white', cursor: 'pointer' },
  statsContainer: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' },
  statBox: { background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center' },
  tableContainer: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { background: '#e9ecef', padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' },
  td: { padding: '0.75rem', borderBottom: '1px solid #dee2e6', whiteSpace: 'nowrap' }
});

export default AdminPage;