import React, { useState } from 'react';
import { Menu, X, Wallet, Twitter, MessageCircle, Users } from 'lucide-react'; 
import WalletModal from './WalletModal'; 
import { useAccount } from 'wagmi'; 
// Yeni importlar: Dil bağlamını kullanmak için
import { useLocalization } from '../context/LocalizationContext'; 

// === TOKEN SAHİBİNİN SABİT ÖN SATIŞ ADRESİ ===
// Bu adres artık sadece WalletModal içinde gösterilecektir.
const DEVELOPER_RECEIVE_ADDRESS = '0xe44570ff2Ac3F906285bDC87A84E391a5E8Ad3dE' as `0x${string}`; 
// ========================================================

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  
  const { isConnected, address } = useAccount(); 
  // KRİTİK: Tercüme fonksiyonunu ve dil değiştirme fonksiyonunu alıyoruz
  const { lang, t, setLang } = useLocalization(); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const formatAddress = (addr: `0x${string}` | undefined) => {
    if (!addr) return t('connect_wallet');
    // Cüzdan bağlıyken sadece adresin kısaltılmış halini gösterir
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleWalletClick = () => {
    setIsWalletModalOpen(true);
  };

  // KRİTİK: Dil değiştirme fonksiyonu
  const toggleLanguage = () => {
    setLang(lang === 'tr' ? 'en' : 'tr');
  };

  // Orijinal "Cüzdan Bağla" butonunu render eden fonksiyon
  const renderOriginalButton = (isMobile: boolean = false) => (
    <button 
      onClick={handleWalletClick}
      className={`flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${isMobile ? 'w-full justify-center mt-4' : ''}`}
    >
      <Wallet size={20} />
      {/* Bağlıysa adresi, değilse "Cüzdan Bağla" metnini tercüme ederek göster */}
      <span>{isConnected ? formatAddress(address) : t('connect_wallet')}</span>
    </button>
  );

  const renderLanguageButton = () => (
    <button
        onClick={toggleLanguage}
        title={lang === 'tr' ? 'Switch to English' : 'Türkçeye Geç'}
        className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full py-2 px-3 text-sm font-semibold text-gray-700 transition-colors border border-gray-300"
    >
        {/* Dil bayrağı simgesi (Emoji) */}
        <span>{lang === 'tr' ? '🇹🇷' : '🇺🇸'}</span>
        <span>{lang === 'tr' ? 'TR' : 'EN'}</span>
    </button>
  );


  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">🦜</span>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                TOKEN PARROT
              </span>
              <div className="text-sm text-gray-600 font-medium">$PARROT</div>
            </div>
          </div>

          {/* Desktop Navigation (Metinler t() fonksiyonu ile değiştirildi) */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors font-medium">{t('home')}</a>
            <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors font-medium">{t('about')}</a>
            <a href="#tokenomics" className="text-gray-700 hover:text-green-600 transition-colors font-medium">{t('tokenomics')}</a>
            <a href="#how-to-buy" className="text-gray-700 hover:text-green-600 transition-colors font-medium">{t('how_to_buy')}</a>
            <a href="#roadmap" className="text-gray-700 hover:text-green-600 transition-colors font-medium">{t('roadmap')}</a>
          </nav>

          {/* Social Icons, Dil Seçeneği & Connect Wallet */}
          <div className="flex items-center space-x-4">
            
            {/* Dil Seçme Butonu (Masaüstü) */}
            <div className="hidden md:block">
                {renderLanguageButton()}
            </div>

            {/* Sosyal Medya İkonları */}
            <div className="flex items-center space-x-2 hidden md:flex"> 
              <a href="#" className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Twitter size={16} className="text-white" />
              </a>
              <a href="#" className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <MessageCircle size={16} className="text-white" />
              </a>
              <a href="#" className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Users size={16} className="text-white" />
              </a>
            </div>
            
            {/* === DESKTOP CÜZDAN BUTONU === */}
            <div className="hidden md:block">
              {renderOriginalButton(false)}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-gray-700 hover:text-green-600">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-200">
            <div className="flex flex-col space-y-4">
              
              {/* Dil Seçeneği (Mobil) */}
              <div className="px-4 py-2 border-b border-gray-100">
                {renderLanguageButton()}
              </div>

              {/* Linkler (Metinler t() fonksiyonu ile değiştirildi) */}
              <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors font-medium px-4" onClick={toggleMenu}>{t('home')}</a>
              <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors font-medium px-4" onClick={toggleMenu}>{t('about')}</a>
              <a href="#tokenomics" className="text-gray-700 hover:text-green-600 transition-colors font-medium px-4" onClick={toggleMenu}>{t('tokenomics')}</a>
              <a href="#how-to-buy" className="text-gray-700 hover:text-green-600 transition-colors font-medium px-4" onClick={toggleMenu}>{t('how_to_buy')}</a>
              <a href="#roadmap" className="text-gray-700 hover:text-green-600 transition-colors font-medium px-4" onClick={toggleMenu}>{t('roadmap')}</a>
              
              {/* Mobil Social Icons */}
              <div className="flex items-center space-x-2 pt-2 px-4">
                <a href="#" className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Twitter size={16} className="text-white" />
                </a>
                <a href="#" className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                  <MessageCircle size={16} className="text-white" />
                </a>
                <a href="#" className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                  <Users size={16} className="text-white" />
                </a>
              </div>
              
              {/* === MOBİL CÜZDAN BUTONU === */}
              <div className="pt-4 px-4">
                {renderOriginalButton(true)}
              </div>
            </div>
          </div>
        )}
      </div>
      </header>
      
      {/* Wallet Modalı */}
      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
      />
    </>
  );
};

export default Header;
