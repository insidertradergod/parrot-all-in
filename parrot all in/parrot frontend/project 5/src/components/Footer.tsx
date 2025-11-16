import React, { useState, useEffect, useRef } from 'react';
import { Twitter, MessageCircle, Users, Copy, Check, ExternalLink, Shield, FileText } from 'lucide-react';
import { useLocalization } from '../context/LocalizationContext'; 

const Footer = () => {
  const { t } = useLocalization();
  const [copied, setCopied] = useState(false);
  // Animasyon state'i
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  const contractAddress = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4c2bE';

  // --- SCROLL GÖZLEMLEYİCİ HOOK ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      // Footer viewport'un %30'una girdiğinde tetikle
      { threshold: 0.3 } 
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);
  // ------------------------------------

  const copyToClipboard = () => {
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = contractAddress;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { icon: Twitter, labelKey: 'social_twitter', url: '#', followers: '48K', color: 'bg-blue-500 hover:bg-blue-600' },
    { icon: MessageCircle, labelKey: 'social_telegram', url: '#', followers: '32K', color: 'bg-blue-400 hover:bg-blue-500' },
    { icon: Users, labelKey: 'social_discord', url: '#', followers: '18K', color: 'bg-indigo-500 hover:bg-indigo-600' }
  ];

  return (
    // Animasyon sınıfları eklendi
    <footer 
      ref={footerRef}
      className={`bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8 
                  transition-all duration-1000 ease-out 
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">🦜</span>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  TOKEN PARROT
                </span>
                <div className="text-lg text-gray-300 font-medium">$PARROT</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              {t('footer_brand_desc')}
            </p>
            
            {/* Contract Address */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-400 font-medium">{t('contract_address')}:</span>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span className="text-sm font-medium">{copied ? t('copied') : t('copy')}</span>
                </button>
              </div>
              <p className="text-white font-mono text-sm break-all bg-gray-900 p-3 rounded-lg">{contractAddress}</p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">{t('join_our_flock')}</h3>
            <div className="space-y-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    className={`flex items-center space-x-4 ${social.color} p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg`}
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-lg">{t(social.labelKey as any)}</div>
                      <div className="text-sm opacity-90">{social.followers} {t('followers_label')}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Security & Audits */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">{t('security_trust_title')}</h3>
            <div className="space-y-4">
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors group">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <Shield size={20} />
                </div>
                <div>
                  <div className="font-semibold">{t('audit_certik_title')}</div>
                  <div className="text-sm text-gray-400">{t('audit_smart_contract')}</div>
                </div>
                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors group">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <Shield size={20} />
                </div>
                <div>
                  <div className="font-semibold">{t('audit_solidproof_title')}</div>
                  <div className="text-sm text-gray-400">{t('security_verification')}</div>
                </div>
                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors group">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="font-semibold">{t('whitepaper_title')}</div>
                  <div className="text-sm text-gray-400">{t('technical_documentation')}</div>
                </div>
                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              {t('copyright_text')}
            </div>
            
            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">{t('privacy_policy')}</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">{t('terms_of_service')}</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">{t('disclaimer')}</a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl">
            <p className="text-yellow-200 text-sm leading-relaxed">
              <strong>⚠️ {t('disclaimer_warning_title')}:</strong> {t('disclaimer_text')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
