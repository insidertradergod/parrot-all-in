import { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import PresaleWidget from '../components/PresaleWidget';
import Features from '../components/Features';
import Tokenomics from '../components/Tokenomics';
import Roadmap from '../components/Roadmap';
import HowToBuy from '../components/HowToBuy';
import Community from '../components/Community';
import Footer from '../components/Footer';
import ReferralWidget from '../components/ReferralWidget';
// Yeni import: Dil bağlamını kullanmak için
import { useLocalization } from '../context/LocalizationContext';

const HomePage = () => {
  // Tercüme fonksiyonunu alıyoruz
  const { t } = useLocalization(); 
  
  // --- REFERANS KODU YAKALAMA MANTIĞI (KORUNDU) ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');

    if (refCode) {
      localStorage.setItem('referralCode', refCode);
      console.log('Referans kodu yakalandı ve kaydedildi:', refCode);
    }
  }, []); 
  // --- REFERANS KODU YAKALAMA MANTIĞI SONU ---

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 relative overflow-hidden">
      {/* Arka plan elementleri aynı kaldı */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
         {/* Arka plan elementleri buraya gelecek */}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <Hero />

        {/* Presale Widget Section */}
        <section id="presale-widget" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              {t('secure_tokens_title')} {/* Çeviriye açıldı */}
            </h2>
            <p className="text-xl text-gray-700">
              {t('presale_join_desc')} {/* Çeviriye açıldı */}
            </p>
          </div>
          <PresaleWidget />
        </section>

        {/* Referans Bölümü */}
        <section id="referral" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            <ReferralWidget />
          </div>
        </section>

        <Features />
        <Tokenomics />
        <HowToBuy />
        <Roadmap />
        <Community />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
