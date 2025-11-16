import { useState, useEffect } from 'react';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

const PRESALE_CONTRACT_ADDRESS = '0xe44570ff2Ac3F906285bDC87A84E391a5E8Ad3dE';
const BACKEND_API_URL = 'http://localhost:3001/api/transaction';

export const usePresale = () => {
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();
  const [lastTxAmount, setLastTxAmount] = useState<string | null>(null);
  // YENİ EKLENDİ: Son işlemde alınan token miktarını tutmak için
  const [lastTokensBought, setLastTokensBought] = useState<string | null>(null);
  const [isApiCallMade, setIsApiCallMade] = useState(false);

  const { 
    data: ethTxHash, 
    isPending: isEthTxPending, 
    sendTransaction,
    error: wagmiError
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: ethTxHash,
  });

  useEffect(() => {
    // YENİ: lastTokensBought'u da kontrol listesine ekledik
    if (isConfirmed && ethTxHash && address && lastTxAmount && lastTokensBought && !isApiCallMade) {
      setIsApiCallMade(true);
      console.log('Blockchain işlemi onaylandı. Backend\'e veri gönderiliyor...');
      
      const savedRefCode = localStorage.getItem('referralCode');

      const transactionData = {
        walletAddress: address,
        ethAmount: lastTxAmount,
        txHash: ethTxHash,
        referralCode: savedRefCode,
        // YENİ EKLENDİ: Satın alınan token miktarı
        parrotTokensBought: Number(lastTokensBought.replace(/,/g, '')), // Virgülleri temizleyip sayıya çeviriyoruz
      };

      fetch(BACKEND_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Backend yanıtı:', data.message);
        localStorage.removeItem('referralCode');
      })
      .catch((error) => {
        console.error('Backend\'e veri gönderilirken hata oluştu:', error);
      });
    }
  }, [isConfirmed, ethTxHash, address, lastTxAmount, lastTokensBought, isApiCallMade]);

  useEffect(() => { /* Bu kısım aynı kaldı */ }, [wagmiError]);

  // YENİ: buyWithETH fonksiyonu artık ikinci bir parametre alıyor: tokensBought
  const buyWithETH = (ethAmount: string, tokensBought: string) => {
    if (!ethAmount || parseFloat(ethAmount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    setError(null);
    setIsApiCallMade(false); 
    setLastTxAmount(ethAmount);
    setLastTokensBought(tokensBought); // Alınan token miktarını state'e kaydediyoruz.
    sendTransaction({
      to: PRESALE_CONTRACT_ADDRESS,
      value: parseEther(ethAmount),
    });
  };

  const buyWithUSDT = (usdtAmount: string) => { /* Bu kısım aynı kaldı */ };
  const clearError = () => { /* Bu kısım aynı kaldı */ };

  return {
    isLoading: isEthTxPending || isConfirming,
    error,
    txHash: ethTxHash,
    success: isConfirmed,
    buyWithETH,
    buyWithUSDT,
    clearError,
  };
};