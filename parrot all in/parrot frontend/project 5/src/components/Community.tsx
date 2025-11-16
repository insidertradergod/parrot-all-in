import React, { useState, useEffect, useRef } from 'react'; // useRef ve useEffect eklendi
import { Users, MessageCircle, Twitter, TrendingUp } from 'lucide-react';
import { useLocalization } from '../context/LocalizationContext'; // Tercüme Hook'u

const Community = () => {
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

  const stats = [
    {
      icon: Users,
      number: '25,847',
      labelKey: 'stat_holders',
      color: 'from-green-400 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      icon: Twitter,
      number: '48,392',
      labelKey: 'stat_twitter',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      icon: MessageCircle,
      number: '32,156',
      labelKey: 'stat_telegram',
      color: 'from-indigo-400 to-indigo-600',
      bgColor: 'from-indigo-50 to-indigo-100'
    },
    {
      icon: TrendingUp,
      number: '156%',
      labelKey: 'stat_growth',
      color: 'from-orange-400 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100'
    }
  ];

  const milestones = [
    { milestoneKey: 'milestone_10k', status: 'completed', rewardKey: 'reward_nft' },
    { milestoneKey: 'milestone_25k', status: 'completed', rewardKey: 'reward_staking' },
    { milestoneKey: 'milestone_50k', status: 'current', rewardKey: 'reward_cex' },
    { milestoneKey: 'milestone_100k', status: 'upcoming', rewardKey: 'reward_mainnet' }
  ];

  const getStatusText = (status: string) => {
    if (status === 'completed') return t('completed');
    if (status === 'current') return t('live_status');
    return t('upcoming_status');
  };

  return (
    <section 
        id="community" 
        ref={sectionRef} // Animasyon hook'una bağlanır
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50 transition-all duration-1000 ease-out 
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            {t('community_title')} 🦜
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t('community_desc')}
          </p>
        </div>

        {/* Community Stats (Kademeli Giriş) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index} 
                className={`bg-gradient-to-br ${stat.bgColor} rounded-3xl border-2 border-green-200 p-8 text-center hover:shadow-xl transition-all duration-500 transform hover:scale-105 
                           ${isVisible ? `opacity-100 translate-y-0 delay-${index * 100}` : 'opacity-0 translate-y-5'}`}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <IconComponent className="text-white" size={32} />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{t(stat.labelKey as any)}</div>
              </div>
            );
          })}
        </div>

        {/* Community Milestones (Tek Parça Giriş) */}
        <div className={`bg-white rounded-3xl border-2 border-green-200 p-8 shadow-xl transition-all duration-700 ease-out delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">{t('milestones_title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <div key={index} className={`p-6 rounded-2xl border-2 text-center ${
                milestone.status === 'completed' 
                  ? 'bg-green-50 border-green-300' 
                  : milestone.status === 'current'
                  ? 'bg-blue-50 border-blue-300'
                  : 'bg-gray-50 border-gray-300'
              }`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  milestone.status === 'completed'
                    ? 'bg-green-500 text-white'
                    : milestone.status === 'current'
                    ? 'bg-blue-500 text-white animate-pulse'
                    : 'bg-gray-400 text-white'
                }`}>
                  {milestone.status === 'completed' ? '✓' : milestone.status === 'current' ? '🎯' : '⏳'}
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{t(milestone.milestoneKey as any)}</h4>
                <p className="text-sm text-gray-600">{t(milestone.rewardKey as any)}</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                  milestone.status === 'completed'
                    ? 'bg-green-500 text-white'
                    : milestone.status === 'current'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-400 text-white'
                }`}>
                  {getStatusText(milestone.status).toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Links (Alttan Kademeli Giriş) */}
        <div className={`mt-16 text-center transition-all duration-700 ease-out delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="text-2xl font-bold text-gray-800 mb-8">{t('social_title')}</h3>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="#" className="flex items-center space-x-3 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Twitter size={24} />
              <span>{t('follow_twitter')}</span>
              <span className="bg-white text-blue-500 px-2 py-1 rounded-full text-sm font-bold">48K</span>
            </a>
            <a href="#" className="flex items-center space-x-3 bg-blue-400 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              <MessageCircle size={24} />
              <span>{t('join_telegram')}</span>
              <span className="bg-white text-blue-400 px-2 py-1 rounded-full text-sm font-bold">32K</span>
            </a>
            <a href="#" className="flex items-center space-x-3 bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Users size={24} />
              <span>{t('discord_server')}</span>
              <span className="bg-white text-indigo-500 px-2 py-1 rounded-full text-sm font-bold">18K</span>
            </a>
          </div>
        </div>

        {/* Community Testimonials (Alttan Kademeli Giriş) */}
        <div className="mt-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-bold text-center mb-8">{t('testimonials_title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial cards are given delays */}
            <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-900' : 'opacity-0 translate-y-5'}`}>
              <div className="text-4xl mb-4">🦜</div>
              <p className="mb-4 italic">{t('testimonial_1')}</p>
              <div className="font-semibold">- @CryptoParrot2024</div>
            </div>
            <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-1000' : 'opacity-0 translate-y-5'}`}>
              <div className="text-4xl mb-4">🚀</div>
              <p className="mb-4 italic">{t('testimonial_2')}</p>
              <div className="font-semibold">- @MoonBirdTrader</div>
            </div>
            <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-1100' : 'opacity-0 translate-y-5'}`}>
              <div className="text-4xl mb-4">💎</div>
              <p className="mb-4 italic">{t('testimonial_3')}</p>
              <div className="font-semibold">- @DiamondWingsHODL</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
