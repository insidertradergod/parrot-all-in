import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Sadece başlangıçtaki lucide-react hariç tutmasını koruyoruz.
    // Web3Modal ile ilgili tüm 'include' ve 'exclude' ayarlarını kaldırıyoruz.
    exclude: ['lucide-react'], 
  },
});