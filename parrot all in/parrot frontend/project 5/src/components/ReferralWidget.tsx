import React, { useState, useEffect, useMemo, useRef } from 'react'; // useRef eklendi
import { Users, Gift, Copy, Check, Share2, TrendingUp, Award, Star, Loader, Lock, LogOut } from 'lucide-react';
import { useAccount } from 'wagmi'; // Wagmi Hook
import { useLocalization } from '../context/LocalizationContext'; // Tercüme Hook

// --- Yeni Fonksiyonlar ve Hook'lar ---

// API çağrısını simüle eden mock fonksiyon.
const mockFetchReferralData = (walletAddress: string) => {
  return new Promise((resolve, reject) => {
    const shouldError = Math.random() < 0.1; 
    if (shouldError) {
      setTimeout(() => reject(new Error("API'den veri çekilirken bir hata oluştu.")), 1500);
      return;
    }

    setTimeout(() => {
      resolve({
        referralCode: `TP${walletAddress.substring(2, 6).toUpperCase()}${walletAddress.substring(walletAddress.length - 4).toUpperCase()}`,
        totalReferrals: 47,
        totalEarned: 2.8,
        pendingRewards: 0.5,
        level: 'Gold',
        recentReferrals: [
          { address: '0x1234...5678', amount: '0.5 ETH', bonus: '0.025 ETH', time: '2 hours ago' },
          { address: '0x9876...4321', amount: '1.2 ETH', bonus: '0.06 ETH', time: '5 hours ago' },
          { address: '0x5555...9999', amount: '0.8 ETH', bonus: '0.04 ETH', time: '1 day ago' }
        ]
      });
    }, 1500);
  });
};

// Veri çekme ve state yönetimini kapsayan özel hook
const useFetchReferralData = (walletAddress: string | undefined) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!walletAddress) return;

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const result = await mockFetchReferralData(walletAddress);
        setData(result);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [walletAddress]);

  return { data, isLoading, isError };
};

const ReferralWidget = () => {
  // Wagmi ve Tercüme hook'larını kullanıyoruz
  const { isConnected, address } = useAccount();
  const { t } = useLocalization();

  // --- SCROLL ANIMASYON HOOK'LARI ---
  const [isVisible, setIsVisible] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); 
        }
      },
      { threshold: 0.2 } // Widget'ın %20'si görünür olduğunda tetikle
    );

    if (widgetRef.current) {
      observer.observe(widgetRef.current);
    }

    return () => {
      if (widgetRef.current) {
        observer.unobserve(widgetRef.current);
      }
    };
  }, []);
  // ------------------------------------

  const [copied, setCopied] = useState(false);

  // API'den veri çekmek için özel hook'u kullan
  const { data: referralData, isLoading, isError } = useFetchReferralData(address);

  // Dinamik referral kodu oluştur (cüzdan adresine bağlı)
  const referralCode = useMemo(() => {
    if (!address) return null;
    return `TP${address.substring(2, 6).toUpperCase()}${address.substring(address.length - 4).toUpperCase()}`;
  }, [address]);

  const copyReferralLink = () => {
    if (!referralCode) return;
    const referralLink = `https://tokenparrot.com/presale?ref=${referralCode}`;
    
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = referralLink;
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConnectWallet = () => {
    // Header'daki Cüzdan Bağla modalını açmak için tıklama simülasyonu
    const headerButton = document.getElementById('connect-wallet-button');
    if (headerButton) {
        headerButton.click();
    }
  };


  // --- Sabit UI Verileri ---
  const referralTiers = [
    { level: 'Bronze', referrals: '1-9', bonus: '5%', color: 'from-green-400 to-green-600', bgColor: 'from-green-50 to-green-100' },
    { level: 'Silver', referrals: '10-24', bonus: '7%', color: 'from-blue-400 to-blue-600', bgColor: 'from-blue-50 to-blue-100' },
    { level: 'Gold', referrals: '25-49', bonus: '10%', color: 'from-green-500 to-blue-500', bgColor: 'from-green-50 to-blue-50' },
    { level: 'Diamond', referrals: '50+', bonus: '15%', color: 'from-blue-500 to-green-500', bgColor: 'from-blue-50 to-green-50' }
  ];

  return (
    <section 
        ref={widgetRef}
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 relative overflow-hidden transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>🎁</div>
        <div className="absolute top-40 right-20 text-3xl opacity-15 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>💰</div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>🏆</div>
        <div className="absolute bottom-20 right-10 text-2xl opacity-20 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>⭐</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-orange-500 bg-clip-text text-transparent mb-6">
            {t('referral_title')} 
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t('referral_desc')} 
          </p>
        </div>

        {/* Main Referral Panel - Full Width on Desktop */}
        <div className="bg-white rounded-3xl border-2 border-green-200 shadow-2xl overflow-hidden">
          {/* Bağlantı Durumu */}
          {!isConnected ? (
            <div className="p-8 text-center bg-white">
              <div className="flex flex-col items-center justify-center p-8">
                <Lock size={64} className="text-gray-400 mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('unlock_dashboard')}</h3> 
                <p className="text-gray-600 mb-6 max-w-sm">
                  {t('connect_to_stats')} 
                </p>
                <button
                  onClick={handleConnectWallet} // Header modalını açar
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-3"
                >
                  <Gift size={24} />
                  <span>{t('connect_to_start')}</span> 
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Dashboard İçeriği */}
              <div className="bg-gradient-to-r from-green-500 via-blue-500 to-orange-500 p-8 text-white">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                  {isLoading ? (
                    <div className="lg:col-span-4 flex flex-col items-center justify-center py-10">
                      <Loader size={48} className="animate-spin text-white mb-4" />
                      <p className="text-xl font-semibold">{t('loading_data')}</p> 
                    </div>
                  ) : (
                    <>
                      {/* Your Stats */}
                      <div className="lg:col-span-1">
                        <div className="text-center lg:text-left">
                          <div className="text-6xl mb-4">🏆</div>
                          <h3 className="text-2xl font-bold mb-2">{referralData?.level} {t('member')}</h3> 
                          <div className="space-y-2 text-sm opacity-90">
                            <div>{t('total_referrals')}: <span className="font-bold">{referralData?.totalReferrals}</span></div> 
                            <div>{t('total_earned')}: <span className="font-bold">{referralData?.totalEarned} ETH</span></div> 
                            <div>{t('pending')}: <span className="font-bold">{referralData?.pendingRewards} ETH</span></div> 
                          </div>
                        </div>
                      </div>

                      {/* Referral Link */}
                      <div className="lg:col-span-2">
                        <div className="text-center">
                          <h3 className="text-xl font-bold mb-4">{t('your_link')}</h3> 
                          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6">
                            <div className="flex items-center space-x-3 mb-4">
                              <input
                                type="text"
                                readOnly
                                value={`https://tokenparrot.com/presale?ref=${referralCode}`}
                                className="flex-1 bg-white/30 border border-white/40 rounded-lg px-4 py-3 text-white placeholder-white/70 font-mono text-sm"
                              />
                              <button
                                onClick={copyReferralLink}
                                className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                              >
                                {copied ? <Check size={20} /> : <Copy size={20} />}
                                <span>{copied ? t('copied') : t('copy_link')}</span> 
                              </button>
                            </div>
                            {/* Sosyal Paylaşım Butonları */}
                            <div className="flex justify-center space-x-3">
                              <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                                <Share2 size={16} />
                                <span>Twitter</span>
                              </button>
                              <button className="bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                                <Share2 size={16} />
                                <span>Telegram</span>
                              </button>
                              <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                                <Share2 size={16} />
                                <span>Discord</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Current Bonus */}
                      <div className="lg:col-span-1">
                        <div className="text-center lg:text-right">
                          <div className="text-6xl mb-4">💎</div>
                          <h3 className="text-2xl font-bold mb-2">{t('current_bonus')}</h3> 
                          <div className="text-4xl font-bold mb-2">{referralData?.level === 'Bronze' ? '5%' : referralData?.level === 'Silver' ? '7%' : referralData?.level === 'Gold' ? '10%' : '15%'}</div>
                          <div className="text-sm opacity-90">{t('on_every_purchase')}</div> 
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Hata Mesajı */}
              {isError && (
                <div className="p-8 text-center bg-red-100 text-red-700 rounded-lg border-2 border-red-300">
                  <p className="text-lg font-semibold">{t('could_not_fetch_data')}</p> 
                  <p className="text-sm">{t('try_again_or_refresh')}</p> 
                </div>
              )}
              
              {/* İçerik Alanı */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Referral Tiers */}
                  <div className="lg:col-span-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                      <Award className="mr-2 text-green-600" size={24} />
                      {t('tiers_title')} 
                    </h3>
                    <div className="space-y-4">
                      {referralTiers.map((tier, index) => (
                        <div
                          key={index}
                          className={`bg-gradient-to-r ${tier.bgColor} rounded-2xl border-2 ${
                            tier.level === referralData?.level ? 'border-green-400 ring-2 ring-green-200' : 'border-gray-200'
                          } p-4 transition-all duration-300 hover:shadow-lg`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 bg-gradient-to-r ${tier.color} rounded-full flex items-center justify-center`}>
                                <Star className="text-white" size={20} />
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-800">{tier.level}</h4>
                                <p className="text-sm text-gray-600">{tier.referrals} {t('referrals')}</p> 
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-800">{tier.bonus}</div>
                              <div className="text-xs text-gray-600">{t('bonus')}</div> 
                            </div>
                          </div>
                          {tier.level === referralData?.level && (
                            <div className="mt-3 text-center">
                              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                {t('current_level')} 
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* How It Works */}
                  <div className="lg:col-span-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                      <TrendingUp className="mr-2 text-green-600" size={24} />
                      {t('how_it_works')} 
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">{t('step_1_share')}</h4> 
                          <p className="text-gray-600 text-sm">{t('step_1_desc')}</p> 
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">{t('step_2_buy')}</h4> 
                          <p className="text-gray-600 text-sm">{t('step_2_desc')}</p> 
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">{t('step_3_earn')}</h4> 
                          <p className="text-gray-600 text-sm">{t('step_3_desc')}</p> 
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 border border-green-200">
                      <h4 className="font-bold text-green-800 mb-3 flex items-center">
                        <Gift className="mr-2" size={20} />
                        {t('special_bonus')} 
                      </h4>
                      <p className="text-green-700 text-sm">
                        {t('special_bonus_desc')} 
                      </p>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="lg:col-span-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                      <Users className="mr-2 text-green-600" size={24} />
                      {t('recent_activity')} 
                    </h3>
                    <div className="space-y-4">
                      {referralData?.recentReferrals.map((referral, index) => (
                        <div key={index} className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-sm text-gray-600">{referral.address}</span>
                            <span className="text-xs text-gray-500">{referral.time}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm text-gray-700">{t('purchase')}: <span className="font-semibold">{referral.amount}</span></div> 
                              <div className="text-sm text-green-600">{t('your_bonus')}: <span className="font-semibold">{referral.bonus}</span></div> 
                            </div>
                            <div className="text-2xl">🎉</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 text-center">
                      <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                        {t('view_all_activity')} 
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-500 via-blue-500 to-orange-500 rounded-3xl p-8 text-white">
            <div className="text-5xl mb-4">🚀🦜</div>
            <h3 className="text-3xl font-bold mb-4">{t('start_earning_title')}</h3> 
            <p className="text-xl mb-6 opacity-90 max-w-2xl mx-auto">
              {t('start_earning_desc')} 
            </p>
            {isConnected ? (
              <button
                onClick={copyReferralLink} 
                className="bg-white text-green-600 hover:text-green-700 px-12 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {t('share_link_now')} 
              </button>
            ) : (
              <button
                onClick={handleConnectWallet} 
                className="bg-white text-green-600 hover:text-green-700 px-12 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {t('connect_wallet_to_start_lock')} 
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralWidget;
