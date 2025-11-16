import React, { useState, useEffect, useRef } from 'react'; // Animasyon hook'ları eklendi
import { Wallet, CreditCard, Calculator, CheckCircle, Gift } from 'lucide-react';
import { useLocalization } from '../context/LocalizationContext'; // Tercüme Hook'u

const HowToBuy = () => {
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
      { threshold: 0.15 } // Bölümün %15'i görünür olduğunda tetikle
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


  const steps = [
    {
      step: 1,
      icon: Wallet,
      titleKey: 'buy_step_1_title',
      descriptionKey: 'buy_step_1_desc',
      parrot: '🦜💼'
    },
    {
      step: 2,
      icon: CreditCard,
      titleKey: 'buy_step_2_title',
      descriptionKey: 'buy_step_2_desc',
      parrot: '🦜💰'
    },
    {
      step: 3,
      icon: Calculator,
      titleKey: 'buy_step_3_title',
      descriptionKey: 'buy_step_3_desc',
      parrot: '🦜🔢'
    },
    {
      step: 4,
      icon: CheckCircle,
      titleKey: 'buy_step_4_title',
      descriptionKey: 'buy_step_4_desc',
      parrot: '🦜✅'
    },
    {
      step: 5,
      icon: Gift,
      titleKey: 'buy_step_5_title',
      descriptionKey: 'buy_step_5_desc',
      parrot: '🦜🎁'
    }
  ];

  return (
    <section 
        id="how-to-buy" 
        ref={sectionRef} // Animasyon hook'una bağlanır
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-1000 ease-out 
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            {t('buy_title')}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t('buy_desc')}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={index} 
                className={`relative transition-all duration-500 ease-out 
                            ${isVisible ? `opacity-100 translate-y-0 delay-${index * 150}` : 'opacity-0 translate-y-5'}`}
              >
                {/* Connection Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-4 z-10">
                    <div className="text-3xl text-green-400">→</div>
                  </div>
                )}
                
                {/* Connection Arrow (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="text-3xl text-green-400 rotate-90">→</div>
                  </div>
                )}

                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl border-2 border-green-200 p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
                  {/* Background Parrot */}
                  <div className="absolute top-4 right-4 text-4xl opacity-20">
                    {step.parrot}
                  </div>
                  
                  {/* Step Number */}
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl shadow-lg">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg border-2 border-green-200">
                    <IconComponent className="text-green-600" size={32} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{t(step.titleKey as any)}</h3>
                  <p className="text-gray-600 leading-relaxed">{t(step.descriptionKey as any)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ease-out delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8 text-center border-2 border-green-300">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-green-800 mb-3">{t('info_1_title')}</h3>
            <p className="text-green-700">{t('info_1_desc')}</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 text-center border-2 border-blue-300">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-blue-800 mb-3">{t('info_2_title')}</h3>
            <p className="text-blue-700">{t('info_2_desc')}</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8 text-center border-2 border-orange-300">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-orange-800 mb-3">{t('info_3_title')}</h3>
            <p className="text-orange-700">{t('info_3_desc')}</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`mt-16 text-center transition-all duration-1000 ease-out delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 text-white">
            <div className="text-5xl mb-4">🦜💎</div>
            <h3 className="text-2xl font-bold mb-4">{t('cta_title')}</h3>
            <p className="text-lg mb-6 opacity-90">
              {t('cta_desc')}
            </p>
            <button className="bg-white text-green-600 hover:text-green-700 px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105">
              {t('start_buying_now')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToBuy;
