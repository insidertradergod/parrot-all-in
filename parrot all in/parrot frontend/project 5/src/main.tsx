import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Kütüphanelerden gerekli modülleri import ediyoruz
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// SADECE KARARLI 2 TEMEL CONNECTOR (Coinbase, WalletConnect'in içine alındı)
import { walletConnect, injected } from 'wagmi/connectors';

// -----------------------------------------------------
// 1. WALLETCONNECT PROJE ID'Sİ
const projectId = '3c9fcfd2ce01bb2dd9cf111adc33933d';
// -----------------------------------------------------

// Uygulamanızın desteklediği zincirler
const chains = [mainnet, sepolia];

// wagmi'nin çalışması için temel yapılandırmayı oluşturuyoruz
const config = createConfig({
  chains: chains,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  // 2. 2 TEMEL VE KARARLI CÜZDAN CONNECTOR'I
  connectors: [
    // 1. MetaMask ve diğer tarayıcı eklentileri (Tarayıcıda otomatik tanınır)
    injected(), 
    
    // 2. WalletConnect (Coinbase Dahil Tüm Mobil Cüzdanlar için)
    walletConnect({ 
      projectId, 
      showQrModal: true // QR modalını zorla açarak sorunları aşıyoruz
    }), 
  ],
});

// React Query için bir istemci (client) oluşturuyoruz
const queryClient = new QueryClient();

// Uygulamamızı render ediyoruz
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
