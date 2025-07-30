'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Universite {
  id: string;
  isim: string;
  sehir: string;
  urapSiralamasi: number;
  ogrenciMemnuniyeti: number;
  mezunIstihdam: number;
  yasamMaliyeti: 'Düşük' | 'Orta' | 'Yüksek';
  kampusYasami: number;
  tabanPuan?: number;
  kontenjan?: number;
  logo: string;
}

interface KriterleriAgirliklari {
  akademikKalite: number;
  ogrenciMemnuniyeti: number;
  mezunIstihdam: number;
  yasamMaliyeti: number;
  kampusYasami: number;
}

export default function UniversiteEslestiriciSayfasi() {
  const [secilenBolum, setSecilenBolum] = useState<string>('');
  const [puanAraligi, setPuanAraligi] = useState<{min: number, max: number}>({min: 0, max: 500});
  const [tercihEdilenSehirler, setTercihEdilenSehirler] = useState<string[]>([]);
  const [butce, setButce] = useState<'düşük' | 'orta' | 'yüksek'>('orta');
  const [kriterAgirliklari, setKriterAgirliklari] = useState<KriterleriAgirliklari>({
    akademikKalite: 30,
    ogrenciMemnuniyeti: 25,
    mezunIstihdam: 25,
    yasamMaliyeti: 10,
    kampusYasami: 10
  });
  const [analizTamamlandi, setAnalizTamamlandi] = useState(false);

  const universiteler: Universite[] = [
    {
      id: 'itu',
      isim: 'İstanbul Teknik Üniversitesi',
      sehir: 'İstanbul',
      urapSiralamasi: 3,
      ogrenciMemnuniyeti: 87,
      mezunIstihdam: 94,
      yasamMaliyeti: 'Yüksek',
      kampusYasami: 85,
      tabanPuan: 485,
      kontenjan: 120,
      logo: '🏛️'
    },
    {
      id: 'odtu',
      isim: 'Orta Doğu Teknik Üniversitesi',
      sehir: 'Ankara',
      urapSiralamasi: 1,
      ogrenciMemnuniyeti: 92,
      mezunIstihdam: 96,
      yasamMaliyeti: 'Orta',
      kampusYasami: 95,
      tabanPuan: 495,
      kontenjan: 100,
      logo: '🎓'
    },
    {
      id: 'bogazici',
      isim: 'Boğaziçi Üniversitesi',
      sehir: 'İstanbul',
      urapSiralamasi: 2,
      ogrenciMemnuniyeti: 89,
      mezunIstihdam: 95,
      yasamMaliyeti: 'Yüksek',
      kampusYasami: 88,
      tabanPuan: 490,
      kontenjan: 80,
      logo: '🌉'
    },
    {
      id: 'bilkent',
      isim: 'Bilkent Üniversitesi',
      sehir: 'Ankara',
      urapSiralamasi: 4,
      ogrenciMemnuniyeti: 85,
      mezunIstihdam: 92,
      yasamMaliyeti: 'Yüksek',
      kampusYasami: 90,
      tabanPuan: 475,
      kontenjan: 150,
      logo: '💎'
    },
    {
      id: 'hacettepe',
      isim: 'Hacettepe Üniversitesi',
      sehir: 'Ankara',
      urapSiralamasi: 5,
      ogrenciMemnuniyeti: 83,
      mezunIstihdam: 89,
      yasamMaliyeti: 'Orta',
      kampusYasami: 82,
      tabanPuan: 455,
      kontenjan: 200,
      logo: '🏥'
    },
    {
      id: 'ege',
      isim: 'Ege Üniversitesi',
      sehir: 'İzmir',
      urapSiralamasi: 7,
      ogrenciMemnuniyeti: 81,
      mezunIstihdam: 85,
      yasamMaliyeti: 'Orta',
      kampusYasami: 88,
      tabanPuan: 440,
      kontenjan: 180,  
      logo: '🌊'
    }
  ];

  const bolumler = [
    'Bilgisayar Mühendisliği',
    'Endüstri Mühendisliği', 
    'Makine Mühendisliği',
    'Elektrik-Elektronik Mühendisliği',
    'İnşaat Mühendisliği',
    'Tıp',
    'İşletme',
    'İktisat',
    'Hukuk',
    'Psikoloji'
  ];

  const sehirler = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Adana', 'Konya'];

  const hesaplaSkor = (universite: Universite): number => {
    const akademikSkor = (101 - universite.urapSiralamasi) * (kriterAgirliklari.akademikKalite / 100);
    const memnuniyetSkoru = universite.ogrenciMemnuniyeti * (kriterAgirliklari.ogrenciMemnuniyeti / 100);
    const istihdamSkoru = universite.mezunIstihdam * (kriterAgirliklari.mezunIstihdam / 100);
    const maliyetSkoru = (universite.yasamMaliyeti === 'Düşük' ? 100 : 
                         universite.yasamMaliyeti === 'Orta' ? 70 : 40) * (kriterAgirliklari.yasamMaliyeti / 100);
    const kampusSkoru = universite.kampusYasami * (kriterAgirliklari.kampusYasami / 100);

    return akademikSkor + memnuniyetSkoru + istihdamSkoru + maliyetSkoru + kampusSkoru;
  };

  const universiteyiAnaliz = () => {
    if (!secilenBolum) {
      alert('Lütfen bir bölüm seçin.');
      return;
    }
    setAnalizTamamlandi(true);
  };

  const sehirSecimToggle = (sehir: string) => {
    setTercihEdilenSehirler(prev => 
      prev.includes(sehir) 
        ? prev.filter(s => s !== sehir)
        : [...prev, sehir]
    );
  };

  const kriterDegistir = (kriter: keyof KriterleriAgirliklari, deger: number) => {
    setKriterAgirliklari(prev => ({
      ...prev,
      [kriter]: deger
    }));
  };

  if (analizTamamlandi) {
    const siraliUniversiteler = universiteler
      .filter(uni => tercihEdilenSehirler.length === 0 || tercihEdilenSehirler.includes(uni.sehir))
      .map(uni => ({
        ...uni,
        toplSkor: hesaplaSkor(uni),
        yerlesmOlasiligi: uni.tabanPuan ? 
          (puanAraligi.max >= uni.tabanPuan ? 'Yüksek' :
           puanAraligi.max >= uni.tabanPuan - 20 ? 'Orta' : 'Düşük') : 'Bilinmiyor'
      }))
      .sort((a, b) => b.toplSkor - a.toplSkor);

    return <UniversiteAnalizi universiteler={siraliUniversiteler} secilenBolum={secilenBolum} onGeriDon={() => setAnalizTamamlandi(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/dashboard"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Dashboard'a Dön
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Akıllı Üniversite Eşleştiricisi
            </h1>
            <div></div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Başlık */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Size En Uygun Üniversiteyi Bulun
          </h2>
          <p className="text-lg text-gray-600">
            Objektif veriler ve kişisel tercihlerinizle AI destekli üniversite önerisi alın
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sol Kolon - Kriterler */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Temel Bilgiler */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Temel Tercihleriniz</h3>
              
              <div className="space-y-4">
                {/* Bölüm Seçimi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hedeflediğiniz Bölüm
                  </label>
                  <select 
                    value={secilenBolum}
                    onChange={(e) => setSecilenBolum(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Bölüm seçin...</option>
                    {bolumler.map(bolum => (
                      <option key={bolum} value={bolum}>{bolum}</option>
                    ))}
                  </select>
                </div>

                {/* Puan Aralığı */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Puan Aralığınız
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input 
                        type="number"
                        placeholder="Min puan"
                        value={puanAraligi.min || ''}
                        onChange={(e) => setPuanAraligi(prev => ({...prev, min: Number(e.target.value)}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <input 
                        type="number"
                        placeholder="Max puan"
                        value={puanAraligi.max || ''}
                        onChange={(e) => setPuanAraligi(prev => ({...prev, max: Number(e.target.value)}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Şehir Tercihleri */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tercih Ettiğiniz Şehirler (Opsiyonel)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sehirler.map(sehir => (
                      <button
                        key={sehir}
                        onClick={() => sehirSecimToggle(sehir)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          tercihEdilenSehirler.includes(sehir)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {sehir}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bütçe */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yaşam Maliyeti Bütçeniz
                  </label>
                  <div className="flex space-x-4">
                    {['düşük', 'orta', 'yüksek'].map(seviye => (
                      <button
                        key={seviye}
                        onClick={() => setButce(seviye as any)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          butce === seviye
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {seviye.charAt(0).toUpperCase() + seviye.slice(1)} Bütçe
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Kriter Ağırlıkları */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Sizin İçin Önem Derecesi (%)</h3>
              <p className="text-sm text-gray-600 mb-4">Toplam %100 olacak şekilde önceliklerinizi belirleyin</p>
              
              <div className="space-y-4">
                {[
                  {key: 'akademikKalite', label: 'Akademik Kalite (URAP Sıralaması)', icon: '🎓'},
                  {key: 'ogrenciMemnuniyeti', label: 'Öğrenci Memnuniyeti', icon: '😊'},
                  {key: 'mezunIstihdam', label: 'Mezun İstihdam Oranı', icon: '💼'},
                  {key: 'yasamMaliyeti', label: 'Yaşam Maliyeti', icon: '💰'},
                  {key: 'kampusYasami', label: 'Kampüs Yaşamı', icon: '🏫'}
                ].map(kriter => (
                  <div key={kriter.key} className="flex items-center space-x-4">
                    <span className="text-lg">{kriter.icon}</span>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {kriter.label}
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="0"
                          max="50"
                          value={kriterAgirliklari[kriter.key as keyof KriterleriAgirliklari]}
                          onChange={(e) => kriterDegistir(kriter.key as keyof KriterleriAgirliklari, Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="w-12 text-sm font-medium text-right">
                          %{kriterAgirliklari[kriter.key as keyof KriterleriAgirliklari]}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  Toplam: %{Object.values(kriterAgirliklari).reduce((sum, val) => sum + val, 0)}
                  {Object.values(kriterAgirliklari).reduce((sum, val) => sum + val, 0) !== 100 && (
                    <span className="text-red-600 ml-2">⚠️ Toplam %100 olmalı</span>
                  )}
                </p>
              </div>
            </div>

          </div>

          {/* Sağ Kolon - Bilgilendirme ve Aksiyon */}
          <div className="space-y-6">
            
            {/* Analiz Butonu */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">3. Analizi Başlat</h3>
              <p className="text-gray-600 text-sm mb-4">
                Tercihlerinize göre en uygun üniversiteleri AI ile analiz edeceğiz
              </p>
              <button
                onClick={universiteyiAnaliz}
                disabled={!secilenBolum || Object.values(kriterAgirliklari).reduce((sum, val) => sum + val, 0) !== 100}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  secilenBolum && Object.values(kriterAgirliklari).reduce((sum, val) => sum + val, 0) === 100
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                🤖 AI Analizi Başlat
              </button>
            </div>

            {/* Veri Kaynakları */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Veri Kaynaklarımız</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>URAP Türkiye Sıralamaları</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Öğrenci Memnuniyet Araştırmaları</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span>YÖK Mezun Takip Sistemi</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  <span>ÖSYM Yerleştirme İstatistikleri</span>
                </div>
              </div>
            </div>

            {/* İpuçları */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 İpuçları</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <p>• Akademik kaliteye %30-40 ağırlık vermeniz önerilir</p>
                <p>• Yaşam maliyeti bütçenize göre ayarlayın</p>
                <p>• Birden fazla şehir seçimi yapmak daha fazla seçenek sunar</p>
                <p>• İstihdam oranları kariyer başarınızı etkiler</p>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}

// Analiz Sonuçlari Komponenti
function UniversiteAnalizi({ universiteler, secilenBolum, onGeriDon }: any) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={onGeriDon}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Kriterleri Düzenle
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              {secilenBolum} - Üniversite Önerileri
            </h1>
            <div className="flex space-x-2">
              <button className="text-green-600 hover:text-green-800">PDF İndir</button>
              <button className="text-blue-600 hover:text-blue-800">Paylaş</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Özet */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Analiz Tamamlandı! 🎯</h2>
          <p className="mb-1">Bölüm: <span className="font-semibold">{secilenBolum}</span></p>
          <p>Size özel olarak sıralanmış {universiteler.length} üniversite önerisi</p>
        </div>

        {/* Üniversite Listesi */}
        <div className="space-y-4">
          {universiteler.map((uni: any, index: number) => (
            <div key={uni.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">{uni.logo}</div>
                    <div>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold mr-3 ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-600'
                        }`}>
                          {index + 1}
                        </span>
                        <h3 className="text-xl font-semibold text-gray-900">{uni.isim}</h3>
                      </div>
                      <p className="text-gray-600">{uni.sehir} • {secilenBolum}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{Math.round(uni.toplSkor)}/100</div>
                    <p className="text-sm text-gray-500">Uygunluk Skoru</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">#{uni.urapSiralamasi}</div>
                    <div className="text-xs text-blue-800">URAP Sırası</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">%{uni.ogrenciMemnuniyeti}</div>
                    <div className="text-xs text-green-800">Memnuniyet</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">%{uni.mezunIstihdam}</div>
                    <div className="text-xs text-purple-800">İstihdam</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">{uni.yasamMaliyeti}</div>
                    <div className="text-xs text-orange-800">Yaşam Maliyeti</div>
                  </div>
                  <div className="text-center p-3 bg-indigo-50 rounded-lg">
                    <div className="text-lg font-bold text-indigo-600">%{uni.kampusYasami}</div>
                    <div className="text-xs text-indigo-800">Kampüs</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    {uni.tabanPuan && (
                      <span className="text-sm text-gray-600">
                        Taban Puan: <span className="font-medium">{uni.tabanPuan}</span>
                      </span>
                    )}
                    {uni.kontenjan && (
                      <span className="text-sm text-gray-600">
                        Kontenjan: <span className="font-medium">{uni.kontenjan}</span>
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      uni.yerlesmOlasiligi === 'Yüksek' ? 'bg-green-100 text-green-800' :
                      uni.yerlesmOlasiligi === 'Orta' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {uni.yerlesmOlasiligi} Olasılık
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
                      Detayları Gör
                    </button>
                    <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm">
                      Karşılaştır
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Önerisi */}
        <div className="mt-8 bg-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">🤖 AI Danışman Önerisi</h3>
          <p className="text-purple-800 mb-4">
            Analiz sonuçlarına göre, ilk 3 üniversite sizin için en optimal seçenekler. 
            {universiteler[0]?.isim} hem akademik kalite hem de istihdam oranı açısından öne çıkıyor.
          </p>
          <Link 
            href="/chat"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Detaylı Danışmanlık Al
          </Link>
        </div>

      </main>
    </div>
  );
}