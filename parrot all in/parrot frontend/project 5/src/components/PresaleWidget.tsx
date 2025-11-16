import React, { useState, useEffect, useRef } from 'react'; // useRef eklendi
import { Calculator, ArrowRightLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAccount } from 'wagmi'; 
import { usePresale } from '../hooks/usePresale';
import { useBalance } from 'wagmi';
import { formatEther } from 'viem';
import { useLocalization } from '../context/LocalizationContext';

const PRESALE_ADDRESS = '0xe44570ff2Ac3F906285bDC87A8Ad3dE'; 
const presaleGoalInEth = 1000; 

const PresaleWidget = () => {
  const { t } = useLocalization(); 

  // --- SCROLL ANIMASYON HOOK'LARI ---
  const [isVisible, setIsVisible] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Gerekirse gözlemlemeyi durdur (animasyon sadece bir kez çalışsın)
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
        // Observer'ı temizlemeyi unutma
        observer.unobserve(widgetRef.current);
      }
    };
  }, []);
  // ------------------------------------

  const [ethAmount, setEthAmount] = useState('');
  const [usdtAmount, setUsdtAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('ETH');
  
  const { isConnected } = useAccount(); 
  
  const { isLoading, error, success, txHash, buyWithETH, buyWithUSDT, clearError } = usePresale();

  const { data: presaleBalance, refetch: refetchPresaleBalance } = useBalance({
    address: PRESALE_ADDRESS,
  });

  const totalRaisedInEth = presaleBalance ? parseFloat(formatEther(presaleBalance.value)) : 0;
  
  const progressPercentage = Math.min((totalRaisedInEth / presaleGoalInEth) * 100, 100);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        refetchPresaleBalance();
      }, 3000);
    }
  }, [success, refetchPresaleBalance]);


  const [nextStageTime, setNextStageTime] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  const stages = [
    { stage: 1, price: 0.0010, status: 'sold-out', tokens: '200M', statusKey: 'sold_out_status' },
    { stage: 2, price: 0.0012, status: 'sold-out', tokens: '200M', statusKey: 'sold_out_status' },
    { stage: 3, price: 0.0014, status: 'current', tokens: '200M', sold: '150M', statusKey: 'live_status' },
    { stage: 4, price: 0.0016, status: 'upcoming', tokens: '200M', statusKey: 'upcoming_status' },
    { stage: 5, price: 0.0018, status: 'upcoming', tokens: '200M', statusKey: 'upcoming_status' }
  ];

  const currentStage = stages.find(s => s.status === 'current');

  useEffect(() => {
    const timer = setInterval(() => {
      setNextStageTime(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateTokens = (amount: string, currency: string) => {
    const numAmount = parseFloat(amount) || 0;
    const pricePerToken = currentStage?.price || 0.0014;
    const ethPriceInUSD = 3000; 

    if (currency === 'ETH') {
      const amountInUSD = numAmount * ethPriceInUSD;
      return (amountInUSD / pricePerToken).toLocaleString(undefined, { maximumFractionDigits: 0 });
    }
    return (numAmount / pricePerToken).toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  const handleAmountChange = (value: string, currency: string) => {
    if (currency === 'ETH') {
      setEthAmount(value);
      const usdtValue = (parseFloat(value) * 2400).toString();
      setUsdtAmount(isNaN(parseFloat(usdtValue)) ? '' : usdtValue);
    } else {
      setUsdtAmount(value);
      const ethValue = (parseFloat(value) / 2400).toString();
      setEthAmount(isNaN(parseFloat(ethValue)) ? '' : ethValue);
    }
  };

  const handleBuyClick = async () => {
    if (!isConnected) {
      const headerButton = document.getElementById('connect-wallet-button');
      if (headerButton) {
        headerButton.click();
      }
      return;
    }

    const amount = selectedCurrency === 'ETH' ? ethAmount : usdtAmount;
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }

    const tokensToBuy = calculateTokens(amount, selectedCurrency);
    const cleanTokensToBuy = tokensToBuy.replace(/,/g, '');

    if (selectedCurrency === 'ETH') {
      await buyWithETH(ethAmount, cleanTokensToBuy);
    } else {
      await buyWithUSDT(usdtAmount);
    }
  };

  const getStageStatusText = (status: string) => {
    if (status === 'current') return t('live_status');
    if (status === 'sold-out') return t('sold_out_status');
    return t('upcoming_status');
  };


  return (
    <>
      {/* Animasyon sınıfları eklendi */}
      <div 
        ref={widgetRef}
        className={`max-w-lg mx-auto bg-white rounded-3xl border-2 border-green-200 p-8 shadow-2xl relative overflow-hidden transition-all duration-1000 ease-out 
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 text-2xl opacity-30">🦜</div>
      <div className="absolute bottom-4 left-4 text-xl opacity-20">🪶</div>
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full mb-4">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="font-semibold">{t('stage_live')} {currentStage?.stage}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('join_presale')}</h2>
        <p className="text-gray-600">1 $PARROT = ${currentStage?.price}</p>
      </div>

      {/* Stage Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{t('fundraising_progress')}</span>
          <span>{progressPercentage.toFixed(2)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-500 relative overflow-hidden"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{t('raised')}: {totalRaisedInEth.toFixed(4)} ETH</span>
          <span>{t('goal')}: {presaleGoalInEth} ETH</span>
        </div>
      </div>

      {/* Stage List */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('presale_stages')}</h3>
        <div className="space-y-2">
          {stages.map((stage) => (
            <div key={stage.stage} className={`flex items-center justify-between p-3 rounded-lg border ${
              stage.status === 'current' 
                ? 'bg-green-50 border-green-300' 
                : stage.status === 'sold-out'
                ? 'bg-gray-50 border-gray-300'
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-gray-800">{t('current_stage_label')} {stage.stage}</span>
                <span className="text-gray-600">${stage.price}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                stage.status === 'current'
                  ? 'bg-green-500 text-white'
                  : stage.status === 'sold-out'
                  ? 'bg-gray-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}>
                {getStageStatusText(stage.status)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Stage Countdown */}
      <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="text-orange-600" size={16} />
          <span className="text-sm font-semibold text-orange-800">{t('next_price_increase')}:</span>
        </div>
        <div className="flex space-x-2">
          <div className="bg-white px-2 py-1 rounded border border-orange-200">
            <span className="font-bold text-orange-800">{nextStageTime.hours.toString().padStart(2, '0')}</span>
            <div className="text-xs text-orange-600">{t('hours')}</div>
          </div>
          <div className="bg-white px-2 py-1 rounded border border-orange-200">
            <span className="font-bold text-orange-800">{nextStageTime.minutes.toString().padStart(2, '0')}</span>
            <div className="text-xs text-orange-600">{t('minutes')}</div>
          </div>
          <div className="bg-white px-2 py-1 rounded border border-orange-200">
            <span className="font-bold text-orange-800">{nextStageTime.seconds.toString().padStart(2, '0')}</span>
            <div className="text-xs text-orange-600">{t('seconds')}</div>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="text-green-600" size={20} />
            <div>
              <p className="text-green-800 font-semibold">{t('transaction_success')}</p>
              {txHash && (
                <a
                  href={`https://etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 text-sm underline hover:text-green-700"
                >
                  {t('view_on_explorer')}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="text-red-600" size={20} />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
            <button
              onClick={clearError}
              className="text-red-600 hover:text-red-700"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Currency Selector */}
      <div className="flex space-x-2 mb-4">
        {['ETH', 'USDT'].map((currency) => (
          <button
            key={currency}
            onClick={() => setSelectedCurrency(currency)}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              selectedCurrency === currency
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {currency}
          </button>
        ))}
      </div>

      {/* Input Section */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('you_pay')} ({selectedCurrency})</label>
          <div className="relative">
            <input
              type="number"
              placeholder="0.0"
              value={selectedCurrency === 'ETH' ? ethAmount : usdtAmount}
              onChange={(e) => handleAmountChange(e.target.value, selectedCurrency)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />
            <span className="absolute right-3 top-3 text-gray-600 font-medium">{selectedCurrency}</span>
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowRightLeft className="text-gray-400" size={20} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('you_receive')}</label>
          <div className="relative">
            <input
              type="text"
              readOnly
              value={calculateTokens(selectedCurrency === 'ETH' ? ethAmount : usdtAmount, selectedCurrency)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 cursor-not-allowed"
            />
            <span className="absolute right-3 top-3 text-gray-600 font-medium">$PARROT</span>
          </div>
        </div>
      </div>

      {/* Buy Buttons */}
      <div className="space-y-3">
        <button 
          onClick={handleBuyClick}
          disabled={isLoading || (!ethAmount && !usdtAmount)}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 py-4 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : !isConnected ? (
            t('connect_wallet')
          ) : (
            `${t('buy_with')} ${selectedCurrency}`
          )}
        </button>
        
        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {['0.1', '0.5', '1', '2'].map((amount) => (
            <button
              key={amount}
              onClick={() => {
                handleAmountChange(amount, 'ETH');
                setSelectedCurrency('ETH');
              }}
              className="py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 transition-colors font-medium"
            >
              {amount} ETH
            </button>
          ))}
        </div>
      </div>
    </div>
    
    {/* Eski WalletModal kaldırıldı */}
  </>
  );
};

export default PresaleWidget;
