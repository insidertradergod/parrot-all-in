import React, { useState, useEffect, useRef } from 'react'; // useRef eklendi
import { ArrowRight } from 'lucide-react';
import { useAccount } from 'wagmi'; 
import { useLocalization } from '../context/LocalizationContext';

const Hero = () => {
  // Tercüme fonksiyonunu alıyoruz
  const { t } = useLocalization(); 
  
  const { isConnected } = useAccount(); 

  // Animasyon için state ve ref
  const [hasLoaded, setHasLoaded] = useState(false);
  const heroRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 15,
    minutes: 32,
    seconds: 45
  });

  // Zamanlayıcı useEffect'i aynı kalır.
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Sayfa yüklendiğinde bir kerelik animasyonu tetikle
  useEffect(() => {
    // Sayfanın ilk yüklenişinde animasyonu çalıştırmak için setHasLoaded(true) diyoruz.
    setHasLoaded(true);
  }, []);


  const handleBuyClick = () => {
    // Cüzdan bağlı değilse, Header'daki butona tıklama simülasyonu yaparak modalı aç
    if (!isConnected) {
        // Header butonu ID'si ile modalı açan butonu tetikliyoruz
        const headerButton = document.getElementById('connect-wallet-button');
        if (headerButton) {
            headerButton.click();
            return;
        }
    }
    
    // Bağlıysa veya modal açıldıysa (veya açıldıktan sonra bağlandıysa), Presale Widget'a kaydır
    const presaleSection = document.querySelector('#presale-widget');
    if (presaleSection) {
        presaleSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Zaman birimlerini çeviri anahtarları ile eşleştir
  const translateUnit = (unit: string) => {
    if (unit === 'days') return t('days'); // Sözlüğe ekleyeceğiz
    if (unit === 'hours') return t('hours');
    if (unit === 'minutes') return t('minutes');
    if (unit === 'seconds') return t('seconds');
    return unit;
  };

  return (
    <>
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 relative overflow-hidden">
      {/* Floating Leaves Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>🍃</div>
        <div className="absolute top-40 right-20 text-4xl opacity-30 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>🌿</div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-25 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>🍃</div>
        <div className="absolute bottom-20 right-10 text-3xl opacity-20 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>🌿</div>
      </div>

      <div ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-8">
          
          {/* Animated Parrot Mascot */}
          <div className={`relative mx-auto w-48 h-48 mb-8 transition-all duration-700 ease-out ${hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute inset-4 flex items-center justify-center">
              <div className="text-8xl animate-bounce" style={{ animationDuration: '2s' }}>🦜</div>
            </div>
            {/* Floating feathers */}
            <div className="absolute -top-4 -right-4 text-2xl animate-ping opacity-60">🪶</div>
            <div className="absolute -bottom-4 -left-4 text-xl animate-ping opacity-40" style={{ animationDelay: '1s' }}>🪶</div>
          </div>

          {/* Main Title and Slogan (Animasyon Eklendi) */}
          <div className={`space-y-4 transition-all duration-700 ease-out delay-200 ${hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-orange-500 bg-clip-text text-transparent">
              TOKEN PARROT
            </h1>
            <div className="text-2xl md:text-3xl font-semibold text-gray-700">
              {t('hero_slogan')} 🦜 
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('hero_desc')} 
            </p>
          </div>

          {/* Stage Indicator (Animasyon Eklendi) */}
          <div className={`inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-700 ease-out delay-300 ${hasLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span>{t('presale_live')} 3 {t('next_price')} - $0.0014 {t('presale_price')}</span> 
          </div>

          {/* Countdown Timer (Animasyon Eklendi) */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-green-200 p-6 max-w-2xl mx-auto shadow-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('presale_ends_in')}</h3> 
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div 
                  key={unit} 
                  className={`bg-gradient-to-br from-green-100 to-blue-100 rounded-lg p-4 border border-green-200 transition-all duration-500 delay-500 ${hasLoaded ? 'opacity-100' : 'opacity-0'}`}
                >
                  <div className="text-2xl md:text-3xl font-bold text-gray-800">{value.toString().padStart(2, '0')}</div>
                  {/* Çeviri fonksiyonu ile birimler güncellendi */}
                  <div className="text-sm text-gray-600 uppercase font-medium">{translateUnit(unit).toUpperCase()}</div> 
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button (Animasyon Eklendi) */}
          <div className={`space-y-4 transition-all duration-700 ease-out delay-500 ${hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button 
              onClick={handleBuyClick}
              className="group bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-12 py-4 rounded-full text-xl font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <span className="flex items-center space-x-3">
                <span>{isConnected ? t('buy_now') : `${t('connect_wallet')} & ${t('buy_now')}`}</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
              </span>
            </button>
            <p className="text-sm text-gray-600">
              {t('current_stage')}: <span className="text-green-600 font-semibold">Stage 3 of 5</span> • 
              {t('next_price')}: <span className="text-orange-600 font-semibold">$0.0016</span>
            </p>
          </div>
        </div>
      </div>
      </section>
    </>
  );
};

export default Hero;
