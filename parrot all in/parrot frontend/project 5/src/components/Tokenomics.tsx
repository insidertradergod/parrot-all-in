import React from 'react';
import { TrendingUp, DollarSign, Users } from 'lucide-react';
import { useLocalization } from '../context/LocalizationContext'; 
import { motion } from "framer-motion"; // Animasyon için
import CountUp from "react-countup"; // Sayı saydırmak için
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"; // Yeni grafik kütüphanesi

const Tokenomics = () => {
  const { t } = useLocalization();

  // NOT: Token etiketleri artık t() fonksiyonu ile tercüme ediliyor
  const tokenData = [
    { labelKey: 'dist_presale', percentage: 50, color: '#10B981', amount: 500000000 },
    { labelKey: 'dist_liquidity', percentage: 25, color: '#3B82F6', amount: 250000000 },
    { labelKey: 'dist_marketing', percentage: 15, color: '#F59E0B', amount: 150000000 },
    { labelKey: 'dist_team', percentage: 10, color: '#EF4444', amount: 100000000 }
  ];

  return (
    <section id="tokenomics" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 40 }} // Sayfaya girerken alttan yukarı kayma
        whileInView={{ opacity: 1, y: 0 }} // Görünür olduğunda animasyon çalışır
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: -30 }} // Başlık için hafif giriş animasyonu
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            {t('tokenomics')}
          </motion.h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t('tokenomics_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Pie Chart Visualization - Soldan Kayarak Giriş */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full h-auto mx-auto relative flex items-center justify-center lg:w-[500px] lg:h-[500px]">
              <ResponsiveContainer width="100%" height={450}>
                <PieChart>
                  <Pie
                    data={tokenData}
                    dataKey="percentage"
                    nameKey="labelKey"
                    cx="50%"
                    cy="50%"
                    outerRadius={170}
                    innerRadius={110}
                    isAnimationActive={true}
                  >
                    {tokenData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              {/* Center Content - Saydırma Animasyonu */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                  className="text-center bg-white rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-2xl border-4 border-green-200"
                  initial={{ scale: 0.8, boxShadow: "0 0 0px #34d399" }}
                  whileInView={{ scale: 1, boxShadow: "0 0 24px #34d399" }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1 }}
                >
                  <div className="text-3xl mb-1">🦜</div>
                  <div className="text-xl font-bold text-gray-800">
                    {/* Toplam Arz Saydırma */}
                    <CountUp end={1000000000} duration={2} separator="," />
                  </div>
                  <div className="text-sm text-gray-600">$PARROT</div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Distribution Details - Sağdan Kayarak Giriş */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('token_distribution')}</h3>
            {tokenData.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl border-2 border-gray-200 p-6 hover:border-green-300 transition-all duration-300 hover:shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }} // Hafif gecikmeli kart girişi
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-8 h-8 rounded-full shadow-lg"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{t(item.labelKey as any)}</h4>
                      <p className="text-gray-600">
                        {/* Token Miktarı Saydırma */}
                        <CountUp end={item.amount} duration={1.5} separator="," /> {t('token_unit')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-800">
                      {/* Yüzde Saydırma */}
                      <CountUp end={item.percentage} duration={1.2} suffix="%" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Additional Token Features - Alttan Yukarı Kayarak Giriş */}
        <motion.div
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 p-8 text-center hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{t('token_feature_1_title')}</h3>
            <p className="text-gray-600">{t('token_feature_1_desc')}</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 p-8 text-center hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{t('token_feature_2_title')}</h3>
            <p className="text-gray-600">{t('token_feature_2_desc')}</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200 p-8 text-center hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{t('token_feature_3_title')}</h3>
            <p className="text-gray-600">{t('token_feature_3_desc')}</p>
          </div>
        </motion.div>

        {/* Token Details - Alttan Kayarak Giriş */}
        <motion.div
            className="mt-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">
                <CountUp end={1000000000} duration={2} separator="," />
              </div>
              <div className="opacity-90">{t('stats_supply')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">0%</div>
              <div className="opacity-90">{t('token_tax')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">12 {t('months')}</div>
              <div className="opacity-90">{t('team_lock_period')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Layer 2</div>
              <div className="opacity-90">{t('blockchain_tech')}</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Tokenomics;
