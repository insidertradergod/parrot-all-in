import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
// Yeni import: Dil sağlayıcımızı (Provider) import ediyoruz
import { LocalizationProvider } from './context/LocalizationContext'; 

function App() {

  // --- REFERANS KODU YÖNETİMİ ---
  // Bu useEffect, uygulama ilk yüklendiğinde SADECE BİR KEZ çalışır.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');

    if (refCode) {
      localStorage.setItem('referralCode', refCode);
      console.log('Referans kodu yakalandı ve kaydedildi:', refCode);
    }
  }, []); // Boş dependency array'i sayesinde sadece ilk render'da çalışır.
  // --- REFERANS KODU YÖNETİMİ SONU ---

  return (
    // KRİTİK DEĞİŞİKLİK: Uygulamanın tamamını LocalizationProvider ile sarmalıyoruz
    <LocalizationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
