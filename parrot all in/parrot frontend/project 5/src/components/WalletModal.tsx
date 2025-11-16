import React, { useState } from 'react';
import { X, Wallet, QrCode, Copy, Check, LogOut } from 'lucide-react'; 
import { useConnect, useConfig, useAccount, useDisconnect } from 'wagmi'; 
import { injected, walletConnect } from 'wagmi/connectors';
// Yeni import: Dil bağlamını kullanmak için
import { useLocalization } from '../context/LocalizationContext';
import translations from '../context/LocalizationContext'; // Tercüme tipleri için

// === TOKEN SAHİBİNİN SABİT ÖN SATIŞ ADRESİ ===
const DEVELOPER_RECEIVE_ADDRESS = '0xe44570ff2Ac3F906285bDC87A84E391a5E8Ad3dE' as `0x${string}`; 
// ===========================================

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// NOTE: walletOptions içindeki 'name' alanlarını artık t() fonksiyonu ile alacağımız için, 
// sadece translation key'lerini kullanmak daha temiz bir yöntemdir.
const walletOptions = [
  { 
    id: 'injected', 
    nameKey: 'metamask', 
    icon: Wallet,
    getConnector: (config: any) => config.connectors.find((c: any) => c.id === injected.type)
  },
  { 
    id: 'walletConnect', 
    nameKey: 'wc_mobile', 
    icon: QrCode,
    getConnector: (config: any) => config.connectors.find((c: any) => c.id === walletConnect.type)
  },
];

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { connect } = useConnect();
  const config = useConfig();
  const { isConnected, address } = useAccount(); 
  const { disconnect } = useDisconnect();
  const { t } = useLocalization(); // KRİTİK: Tercüme fonksiyonunu alıyoruz
  const [isCopied, setIsCopied] = useState(false); 
  
  if (!isOpen) return null;

  const handleConnect = (connectorId: string) => {
    const option = walletOptions.find(opt => opt.id === connectorId);
    if (!option) return;

    const connector = option.getConnector(config);

    if (connector) {
      connect({ connector });
      onClose(); 
    }
  };

  const handleCopy = () => {
    const addressToCopy = DEVELOPER_RECEIVE_ADDRESS;
    // Adresi kopyalama
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = addressToCopy;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const formatAddress = (addr: `0x${string}`) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="fixed inset-0 z-[100] bg-black bg-opacity-70 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm transform transition-all duration-300 scale-100 border border-gray-100">
        
        {/* Modal Başlığı */}
        <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <h2 className="text-xl font-extrabold text-gray-900">{t('modal_title')}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-200">
            <X size={20} />
          </button>
        </div>

        {/* Cüzdan Seçenekleri */}
        <div className="p-6 space-y-4">
          
          {/* Bağlı Durum Bilgisi */}
          {isConnected && address ? (
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-center text-sm font-medium text-green-700 flex justify-between items-center">
                <span>{t('connected')}: {formatAddress(address)}</span>
                <button 
                  onClick={() => { disconnect(); onClose(); }}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                >
                    <LogOut size={16} />
                    <span>{t('disconnect')}</span>
                </button>
            </div>
          ) : (
            <div className="space-y-4">
                {walletOptions.map(option => {
                    const Icon = option.icon;
                    const connector = option.getConnector(config);
                    const connectorExists = connector !== undefined;

                    return (
                    <button
                        key={option.id}
                        onClick={() => handleConnect(option.id)}
                        disabled={!connectorExists} 
                        className={`w-full flex items-center justify-start p-4 rounded-xl border transition-colors shadow-md ${
                        connectorExists
                            ? 'bg-gradient-to-r from-green-50 to-blue-50 hover:bg-green-100 border-green-200'
                            : 'bg-red-50 text-gray-400 border-red-200 cursor-not-allowed'
                        }`}
                    >
                        <Icon size={24} className={`${connectorExists ? 'text-blue-600' : 'text-gray-400'} mr-4`} />
                        <span className={`font-semibold ${connectorExists ? 'text-gray-800' : 'text-gray-500'}`}>{t(option.nameKey as keyof typeof translations.tr)}</span>
                    </button>
                    );
                })}
            </div>
          )}
        </div>
        
        {/* === SABİT ADRES VE KOPYALAMA BÖLÜMÜ === */}
        <div className="p-6 pt-0 space-y-3">
          <div className="text-sm font-semibold text-gray-800 border-t pt-4">
            {t('direct_transfer')}
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-100 rounded-xl border border-gray-200">
            <span className="text-sm font-mono text-gray-700 select-all">
              {formatAddress(DEVELOPER_RECEIVE_ADDRESS)}
            </span>
            <button 
              onClick={handleCopy}
              className={`flex items-center justify-center p-2 rounded-lg transition-colors ${isCopied ? 'bg-green-500' : 'bg-white hover:bg-gray-200'}`}
              title={t('copy')}
            >
              {isCopied ? <Check size={18} className="text-white" /> : <Copy size={18} className="text-blue-500" />}
            </button>
          </div>
        </div>
        {/* === SABİT ADRES BÖLÜMÜ SONU === */}


        {/* Not */}
        <div className="p-4 text-xs text-gray-500 border-t border-gray-100 text-center rounded-b-2xl bg-gray-50">
            {t('connect_terms')}
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
