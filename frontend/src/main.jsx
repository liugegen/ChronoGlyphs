import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 1. Import semua yang kita butuhkan
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
// Kita tidak mengimpor 'monad' lagi, karena tidak ada
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// 2. Kita definisikan jaringan Monad Testnet secara manual
const monadTestnet = {
  id: 10143, // Chain ID yang Anda berikan
  name: 'Monad Testnet',
  nativeCurrency: {
    name: 'MON',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz'] }, // RPC URL yang Anda berikan
  },
  blockExplorers: {
    default: { name: 'MonadExplorer', url: 'https://testnet.monadexplorer.com' }, // Explorer yang Anda berikan
  },
  testnet: true, // Menandakan ini adalah jaringan tes
};

// 3. Konfigurasi Wagmi dan RainbowKit
const config = getDefaultConfig({
  appName: 'ChronoGlyphs Minting',
  projectId: 'a38ca4b32632900226d2a239c15962e7', // <-- JANGAN LUPA GANTI DENGAN PROJECT ID ANDA DARI WALLETCONNECT
  chains: [monadTestnet], // <-- Kita gunakan definisi manual kita di sini
  ssr: false, 
});

const queryClient = new QueryClient();

// 4. Bungkus komponen <App /> kita dengan semua Provider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
