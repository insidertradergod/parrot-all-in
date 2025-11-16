import React, { useState, useEffect, useRef } from 'react'; // useRef ve useEffect eklendi
import { useLocalization } from '../context/LocalizationContext';

const Features = () => {
  const { t } = useLocalization();

  // --- SCROLL ANIMASYON HOOK'LARI ---
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animasyonun sadece bir kez çalışması için observer'ı durdur
          observer.unobserve(entry.target); 
        }
      },
      { threshold: 0.2 } // Bölümün %20'si görünür olduğunda tetikle
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  // ------------------------------------

  const features = [
    {
      icon: '🦜💰',
      titleKey: 'feature_1_title',
      descriptionKey: 'feature_1_desc',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: '⚡🦜',
      titleKey: 'feature_2_title',
      descriptionKey: 'feature_2_desc',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: '🦜🦜🦜',
      titleKey: 'feature_3_title',
      descriptionKey: 'feature_3_desc',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: '🛡️🦜',
      titleKey: 'feature_4_title',
      descriptionKey: 'feature_4_desc',
      color: 'from-red-400 to-red-600'
    },
    {
      icon: '🦜💎',
      titleKey: 'feature_5_title',
      descriptionKey: 'feature_5_desc',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: '🔧🦜',
      titleKey: 'feature_6_title',
      descriptionKey: 'feature_6_desc',
      color: 'from-indigo-400 to-indigo-600'
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef} // Animasyon hook'una bağlanır
      className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50 transition-all duration-1000 ease-out 
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Başlık Bölümü */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            {t('features_title')}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t('features_desc')}
          </p>
        </div>

        {/* Özellik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              // Kartlara hafif gecikmeli animasyon ekleniyor
              className={`group bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-green-300 transition-all duration-500 transform hover:scale-105 hover:shadow-xl 
                          ${isVisible ? `opacity-100 translate-y-0 delay-${index * 150}` : 'opacity-0 translate-y-5'}`}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-2xl`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t(feature.titleKey as any)}</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">
                {t(feature.descriptionKey as any)}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className={`mt-20 bg-white rounded-3xl border-2 border-green-200 p-8 shadow-xl transition-all duration-700 ease-out delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">1B</div>
              <div className="text-gray-600 font-medium">{t('stats_supply')}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">$2.8M</div>
              <div className="text-gray-600 font-medium">{t('stats_raised')}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">12,500+</div>
              <div className="text-gray-600 font-medium">{t('stats_holders')}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">{t('stats_support')}</div>
            </div>
          </div>
        </div>

        {/* Why TOKEN PARROT Section */}
        <div className={`mt-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 text-white transition-all duration-700 ease-out delay-900 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">{t('talk_is_cheap_title')}</h3>
            <p className="text-xl opacity-90">{t('talk_is_cheap_desc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-500 font-bold text-sm">✓</span>
                </div>
                <span className="font-semibold">{t('why_feature_1')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-500 font-bold text-sm">✓</span>
                </div>
                <span className="font-semibold">{t('why_feature_2')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-500 font-bold text-sm">✓</span>
                </div>
                <span className="font-semibold">{t('why_feature_3')}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-500 font-bold text-sm">✓</span>
                </div>
                <span className="font-semibold">{t('why_feature_4')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-500 font-bold text-sm">✓</span>
                </div>
                <span className="font-semibold">{t('why_feature_5')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-500 font-bold text-sm">✓</span>
                </div>
                <span className="font-semibold">{t('why_feature_6')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
