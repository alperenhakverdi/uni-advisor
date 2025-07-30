'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// Mock user state - gerçekte API'den gelecek
interface KullaniciDurumu {
  profilTamamlandi: boolean;
  kisilikTestiAlindi: boolean;
  aiAnaliziVar: boolean;
  universitePlaniVar: boolean;
  beceriPlaniVar: boolean;
  sonMeslekOnerisi?: string;
  sonUniversiteOnerisi?: string;
  tamamlanmaYuzdesi: number;
}

export default function KullaniciPaneli() {
  const [kullaniciDurumu, setKullaniciDurumu] = useState<KullaniciDurumu>({
    profilTamamlandi: true,
    kisilikTestiAlindi: true, 
    aiAnaliziVar: true,
    universitePlaniVar: false,
    beceriPlaniVar: false,
    sonMeslekOnerisi: "Yazılım Geliştirici",
    sonUniversiteOnerisi: "İTÜ Bilgisayar Mühendisliği",
    tamamlanmaYuzdesi: 65
  });

  const sonrakiAdimBelirle = () => {
    if (!kullaniciDurumu.profilTamamlandi) {
      return {
        baslik: "Profilinizi Tamamlayın",
        aciklama: "Kişiselleştirilmiş öneriler için profilinizi doldurun",
        link: "/profile",
        renk: "blue",
        oncelik: "Yüksek"
      };
    }
    
    if (!kullaniciDurumu.kisilikTestiAlindi) {
      return {
        baslik: "Kişilik Testini Alın", 
        aciklama: "Size uygun meslekleri keşfetmek için kişilik analizine başlayın",
        link: "/assessment",
        renk: "purple",
        oncelik: "Yüksek"
      };
    }

    if (!kullaniciDurumu.aiAnaliziVar) {
      return {
        baslik: "AI Analizinizi Bekliyor",
        aciklama: "Test sonuçlarınız AI tarafından analiz ediliyor...",
        link: "/results",
        renk: "orange", 
        oncelik: "Beklemede"
      };
    }

    if (!kullaniciDurumu.universitePlaniVar) {
      return {
        baslik: "Üniversite Planlaması Yapın",
        aciklama: "Meslek önerilerinize göre en uygun üniversiteleri bulun",
        link: "/university-matcher",
        renk: "green",
        oncelik: "Orta"
      };
    }

    return {
      baslik: "Beceri Geliştirme Planı",
      aciklama: "Hedef mesleğiniz için eksik becerilerinizi geliştirin",
      link: "/skills-development", 
      renk: "indigo",
      oncelik: "Düşük"
    };
  };

  const sonrakiAdim = sonrakiAdimBelirle();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              CareerPath AI - Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Hoş geldiniz!</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Aktif</span>
              </div>
              <button className="text-red-600 hover:text-red-800 text-sm">
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* İlerleme Durumu - Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-2">Kariyer Yolculuğunuz</h2>
              <p className="text-blue-100 mb-4">AI destekli rehberlik ile hedefinize ulaşın</p>
              
              {/* İlerleme Çubuğu */}
              <div className="bg-white/20 rounded-full h-3 w-80 mb-2">
                <div 
                  className="bg-white h-3 rounded-full transition-all duration-500"
                  style={{ width: `${kullaniciDurumu.tamamlanmaYuzdesi}%` }}
                ></div>
              </div>
              <p className="text-sm text-blue-100">
                %{kullaniciDurumu.tamamlanmaYuzdesi} tamamlandı
              </p>
            </div>
            
            {/* İlerleme Adımları */}
            <div className="hidden md:flex space-x-4">
              <div className={`text-center ${kullaniciDurumu.profilTamamlandi ? 'text-white' : 'text-blue-300'}`}>
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold ${kullaniciDurumu.profilTamamlandi ? 'bg-white text-blue-600' : 'bg-blue-500'}`}>
                  {kullaniciDurumu.profilTamamlandi ? '✓' : '1'}
                </div>
                <p className="text-xs">Profil</p>
              </div>
              <div className={`text-center ${kullaniciDurumu.kisilikTestiAlindi ? 'text-white' : 'text-blue-300'}`}>
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold ${kullaniciDurumu.kisilikTestiAlindi ? 'bg-white text-blue-600' : 'bg-blue-500'}`}>
                  {kullaniciDurumu.kisilikTestiAlindi ? '✓' : '2'}
                </div>
                <p className="text-xs">Test</p>
              </div>
              <div className={`text-center ${kullaniciDurumu.aiAnaliziVar ? 'text-white' : 'text-blue-300'}`}>
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold ${kullaniciDurumu.aiAnaliziVar ? 'bg-white text-blue-600' : 'bg-blue-500'}`}>
                  {kullaniciDurumu.aiAnaliziVar ? '✓' : '3'}
                </div>
                <p className="text-xs">Analiz</p>
              </div>
              <div className={`text-center ${kullaniciDurumu.universitePlaniVar ? 'text-white' : 'text-blue-300'}`}>
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold ${kullaniciDurumu.universitePlaniVar ? 'bg-white text-blue-600' : 'bg-blue-500'}`}>
                  {kullaniciDurumu.universitePlaniVar ? '✓' : '4'}
                </div>
                <p className="text-xs">Planlama</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sol Kolon - Önemli Aksiyonlar */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Sonraki Adım Kartı */}
            <div className={`bg-white rounded-lg shadow-lg p-6 border-l-4 border-${sonrakiAdim.renk}-500`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-3 h-3 bg-${sonrakiAdim.renk}-500 rounded-full mr-3`}></div>
                  <h3 className="text-xl font-semibold text-gray-900">Önerilen Sonraki Adım</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  sonrakiAdim.oncelik === 'Yüksek' ? 'bg-red-100 text-red-800' :
                  sonrakiAdim.oncelik === 'Orta' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  {sonrakiAdim.oncelik} Öncelik
                </span>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">{sonrakiAdim.baslik}</h4>
              <p className="text-gray-600 mb-4">{sonrakiAdim.aciklama}</p>
              <Link 
                href={sonrakiAdim.link}
                className={`bg-${sonrakiAdim.renk}-600 text-white px-6 py-3 rounded-lg hover:bg-${sonrakiAdim.renk}-700 transition-colors font-semibold inline-flex items-center`}
              >
                Şimdi Başla →
              </Link>
            </div>

            {/* AI Önerileri (Eğer Varsa) */}
            {kullaniciDurumu.aiAnaliziVar && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center mb-4">
                  <div className="text-purple-600 text-2xl mr-3">🤖</div>
                  <h3 className="text-xl font-semibold text-gray-900">Size Özel AI Önerileri</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-1">En Uygun Meslek</h4>
                    <p className="text-blue-700 font-semibold">{kullaniciDurumu.sonMeslekOnerisi}</p>
                    <p className="text-blue-600 text-sm">%94 uyumluluk</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-1">Önerilen Bölüm</h4>
                    <p className="text-green-700 font-semibold">{kullaniciDurumu.sonUniversiteOnerisi}</p>
                    <p className="text-green-600 text-sm">En uygun seçenek</p>
                  </div>
                </div>
                <div className="mt-4 flex space-x-3">
                  <Link href="/results" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                    Tüm Sonuçları Gör →
                  </Link>
                  <Link href="/chat" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                    AI ile Detayları Konuş →
                  </Link>
                </div>
              </div>
            )}

            {/* Hızlı Araçlar */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Hızlı Araçlar</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/university-matcher" className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <div className="text-purple-600 text-xl mr-3">🎓</div>
                  <div>
                    <h4 className="font-medium text-purple-900">Üniversite Karşılaştır</h4>
                    <p className="text-purple-700 text-xs">Objektif verilerle seç</p>
                  </div>
                </Link>
                <Link href="/chat" className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="text-blue-600 text-xl mr-3">💬</div>
                  <div>
                    <h4 className="font-medium text-blue-900">AI Mentor</h4>
                    <p className="text-blue-700 text-xs">Anında rehberlik al</p>
                  </div>
                </Link>
                <Link href="/profile" className="flex items-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                  <div className="text-orange-600 text-xl mr-3">⚙️</div>
                  <div>
                    <h4 className="font-medium text-orange-900">Profil Ayarları</h4>
                    <p className="text-orange-700 text-xs">Bilgileri güncelle</p>
                  </div>
                </Link>
              </div>
            </div>

          </div>

          {/* Sağ Kolon - İstatistikler ve Ekstra */}
          <div className="space-y-6">
            
            {/* Aktivite İstatistikleri */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Aktivite Durumu</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tamamlanan Testler</span>
                  <span className="font-semibold text-blue-600">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">AI Önerileri</span>
                  <span className="font-semibold text-purple-600">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">İncelenen Üniversite</span>
                  <span className="font-semibold text-green-600">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Chat Mesajları</span>
                  <span className="font-semibold text-orange-600">47</span>
                </div>
              </div>
            </div>

            {/* Son Aktiviteler */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🕒 Son Aktiviteler</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">16PF testi tamamlandı</span>
                  <span className="text-gray-400 ml-auto">2 saat önce</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">AI analizi alındı</span>
                  <span className="text-gray-400 ml-auto">1 gün önce</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">Profil güncellendi</span>
                  <span className="text-gray-400 ml-auto">3 gün önce</span>
                </div>
              </div>
            </div>

            {/* Motivasyon Kartı */}
            <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">🎯 Bugünün Hedefi</h3>
              <p className="text-green-100 text-sm mb-4">
                Üniversite planlaması yaparak yolculuğunuzun %80'ini tamamlayın!
              </p>
              <Link 
                href="/university-matcher"
                className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm font-semibold"
              >
                Hadi Başlayalım! 🚀
              </Link>
            </div>

          </div>
        </div>

        {/* Alt Bilgi Çubuğu */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-blue-900">💡 İpucu</h4>
              <p className="text-blue-800 text-sm">
                AI mentörünüzle düzenli sohbet ederek daha kişiselleştirilmiş öneriler alabilirsiniz.
              </p>
            </div>
            <Link 
              href="/chat"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Şimdi Konuş
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}