'use client';

import Link from 'next/link';
import { useState } from 'react';

// Tip tanımlamaları
interface TestVerileri {
  mbtiSonucu: string;
  hollandKodu: string;
  degerler: Record<string, number>;
  yasamTercihleri: Record<string, string>;
  finansalYaklasim: Record<string, string>;
  calismaTarzi: Record<string, string>;
  calismaOrtami: Record<string, string>;
  yetkinlikler: Record<string, number>;
  kisiselGelisim: Record<string, string>;
}

export default function TestSonucuSayfasi() {
  // State management
  const [aktifAdim, setAktifAdim] = useState<number>(1);
  const [testVerileri, setTestVerileri] = useState<TestVerileri>({
    mbtiSonucu: '',
    hollandKodu: '',
    degerler: {},
    yasamTercihleri: {},
    finansalYaklasim: {},
    calismaTarzi: {},
    calismaOrtami: {},
    yetkinlikler: {},
    kisiselGelisim: {}
  });
  const [analizediliyor, setAnalizediliyor] = useState(false);
  const [analizTamamlandi, setAnalizTamamlandi] = useState(false);

  // MBTI seçenekleri
  const mbtiTipleri = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP', 
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP'
  ];

  // Progress hesaplama
  const toplamAdim = 8;
  const progress = (aktifAdim / toplamAdim) * 100;

  // Veri güncelleme fonksiyonu
  const veriGuncelle = (kategori: keyof TestVerileri, veri: any) => {
    setTestVerileri(prev => ({...prev, [kategori]: veri}));
  };

  // Sonraki adıma geçme
  const sonrakiAdim = () => {
    if (aktifAdim < toplamAdim) {
      setAktifAdim(prev => prev + 1);
    }
  };

  // Adım doğrulama
  const adimTamamMi = (adimNo: number): boolean => {
    switch (adimNo) {
      case 1: return testVerileri.mbtiSonucu !== '' && testVerileri.hollandKodu.length === 3;
      case 2: return Object.keys(testVerileri.degerler).length === 8;
      case 3: return Object.keys(testVerileri.yasamTercihleri).length === 5;
      case 4: return Object.keys(testVerileri.finansalYaklasim).length === 4;
      case 5: return Object.keys(testVerileri.calismaTarzi).length === 4;
      case 6: return Object.keys(testVerileri.calismaOrtami).length === 4;
      case 7: return Object.keys(testVerileri.yetkinlikler).length === 8;
      case 8: return Object.keys(testVerileri.kisiselGelisim).length === 3;
      default: return false;
    }
  };

  // AI Analizi başlatma
  const analizBaslat = async () => {
    setAnalizediliyor(true);
    // Mock AI analizi (3 saniye)
    setTimeout(() => {
      setAnalizediliyor(false);
      setAnalizTamamlandi(true);
    }, 3000);
  };

  if (analizTamamlandi) {
    return <AnalizSonucu testVerileri={testVerileri} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/assessment"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Assessment'a Dön
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Kişisel Değerlendirme Testi
            </h1>
            <div className="text-sm text-gray-500">
              Adım {aktifAdim}/{toplamAdim}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">İlerleme</span>
            <span className="text-sm text-gray-500">%{Math.round(progress)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Başlık */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Size Özel Kariyer Analizi
          </h2>
          <p className="text-lg text-gray-600">
            AI destekli analiz ile kişiselleştirilmiş meslek önerilerinizi alın
          </p>
        </div>

        <div className="space-y-8">

          {/* ADIM 1: MBTI & Holland */}
          <div className={`bg-white rounded-lg shadow transition-all duration-500 ${aktifAdim >= 1 ? 'opacity-100' : 'opacity-50'}`}>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                  adimTamamMi(1) ? 'bg-green-500' : aktifAdim === 1 ? 'bg-blue-500' : 'bg-gray-400'
                }`}>
                  {adimTamamMi(1) ? '✓' : '1'}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Kişilik Test Sonuçlarınız
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    MBTI Sonucunuz
                  </label>
                  <select 
                    value={testVerileri.mbtiSonucu}
                    onChange={(e) => veriGuncelle('mbtiSonucu', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">MBTI tipinizi seçin</option>
                    {mbtiTipleri.map(tip => (
                      <option key={tip} value={tip}>{tip}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Holland Kodu (RIASEC)
                  </label>
                  <input
                    type="text"
                    value={testVerileri.hollandKodu}
                    onChange={(e) => veriGuncelle('hollandKodu', e.target.value.toUpperCase())}
                    placeholder="Örn: ISA, RCI"
                    maxLength={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {aktifAdim === 1 && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={sonrakiAdim}
                    disabled={!adimTamamMi(1)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                      adimTamamMi(1)
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Devam Et →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ADIM 2: İş Değerleri */}
          {aktifAdim >= 2 && (
            <div className="bg-white rounded-lg shadow animate-fadeIn">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                    adimTamamMi(2) ? 'bg-green-500' : aktifAdim === 2 ? 'bg-blue-500' : 'bg-gray-400'
                  }`}>
                    {adimTamamMi(2) ? '✓' : '2'}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    İş Değerleriniz
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Aşağıdaki değerleri sizin için önem derecesine göre puanlayın (1: Hiç önemli değil, 5: Çok önemli)
                </p>

                <div className="space-y-4">
                  {[
                    { key: 'maas', label: 'Yüksek Maaş ve Finansal Güvenlik', icon: '💰' },
                    { key: 'denge', label: 'İş-Yaşam Dengesi', icon: '⚖️' },
                    { key: 'yaraticilik', label: 'Yaratıcılık ve İnovasyon', icon: '🎨' },
                    { key: 'yardim', label: 'İnsanlara Yardım Etme', icon: '🤝' },
                    { key: 'prestij', label: 'Prestij ve Tanınırlık', icon: '👑' },
                    { key: 'guvenlik', label: 'İş Güvenliği', icon: '🛡️' },
                    { key: 'ozgurluk', label: 'Özgürlük ve Bağımsızlık', icon: '🕊️' },
                    { key: 'gelisim', label: 'Kişisel Gelişim', icon: '📚' }
                  ].map((deger) => (
                    <div key={deger.key} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{deger.icon}</span>
                          <span className="font-medium text-gray-900">{deger.label}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((puan) => (
                            <button
                              key={puan}
                              type="button"
                              onClick={() => {
                                const yeniDegerler = {...testVerileri.degerler, [deger.key]: puan};
                                veriGuncelle('degerler', yeniDegerler);
                              }}
                              className={`w-8 h-8 rounded-full border-2 transition-colors text-sm font-medium ${
                                testVerileri.degerler[deger.key] === puan
                                  ? 'border-blue-500 bg-blue-500 text-white'
                                  : 'border-gray-300 hover:border-blue-400'
                              }`}
                            >
                              {puan}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {aktifAdim === 2 && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={sonrakiAdim}
                      disabled={!adimTamamMi(2)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        adimTamamMi(2)
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Devam Et →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ADIM 3: Yaşam Tercihleri */}
          {aktifAdim >= 3 && (
            <div className="bg-white rounded-lg shadow animate-fadeIn">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                    adimTamamMi(3) ? 'bg-green-500' : aktifAdim === 3 ? 'bg-blue-500' : 'bg-gray-400'
                  }`}>
                    {adimTamamMi(3) ? '✓' : '3'}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Yaşam Tercihleri
                  </h3>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      key: 'sehirDegistirme',
                      label: 'Şehir değiştirmek ister misiniz?',
                      secenek: ['Evet, her zaman', 'Koşullara göre', 'Hayır, mevcut şehrimde'],
                      icon: '🏙️'
                    },
                    {
                      key: 'belirsizGelir',
                      label: 'Belirsiz gelir durumunu kabul eder misiniz?',
                      secenek: ['Evet, sorun değil', 'Kısa süre için kabul ederim', 'Hayır, sabit gelir isterim'],
                      icon: '💸'
                    },
                    {
                      key: 'uzunCalismaSaati',
                      label: 'Uzun çalışma saatleri (50+ saat/hafta) yapabilir misiniz?',
                      secenek: ['Evet, severim', 'Gerekirse yaparım', 'Hayır, 40 saat yeterli'],
                      icon: '⏰'
                    },
                    {
                      key: 'fizikselAktivite',
                      label: 'Fiziksel güç gerektiren işleri yapabilir misiniz?',
                      secenek: ['Evet, tercih ederim', 'Fark etmez', 'Hayır, masa başı işi isterim'],
                      icon: '💪'
                    },
                    {
                      key: 'surekliSeyahat',
                      label: 'Sürekli seyahat gerektiren işleri yapar mısınız?',
                      secenek: ['Evet, seyahat severim', 'Bazen olabilir', 'Hayır, sabit yerde çalışmak isterim'],
                      icon: '✈️'
                    }
                  ].map((soru) => (
                    <div key={soru.key} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{soru.icon}</span>
                        <h4 className="font-medium text-gray-900">{soru.label}</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {soru.secenek.map((secenek, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              const yeniTercihler = {...testVerileri.yasamTercihleri, [soru.key]: secenek};
                              veriGuncelle('yasamTercihleri', yeniTercihler);
                            }}
                            className={`p-3 text-sm rounded-md border transition-colors ${
                              testVerileri.yasamTercihleri[soru.key] === secenek
                                ? 'border-blue-500 bg-blue-50 text-blue-900'
                                : 'border-gray-300 hover:bg-gray-100'
                            }`}
                          >
                            {secenek}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {aktifAdim === 3 && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={sonrakiAdim}
                      disabled={!adimTamamMi(3)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        adimTamamMi(3)
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Devam Et →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ADIM 4: Finansal Yaklaşım */}
          {aktifAdim >= 4 && (
            <div className="bg-white rounded-lg shadow animate-fadeIn">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                    adimTamamMi(4) ? 'bg-green-500' : aktifAdim === 4 ? 'bg-blue-500' : 'bg-gray-400'
                  }`}>
                    {adimTamamMi(4) ? '✓' : '4'}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Finansal Yaklaşım
                  </h3>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      key: 'gelirOnceligi',
                      label: 'Gelir konusundaki önceliğiniz nedir?',
                      secenek: ['Yüksek maaş en önemli', 'Orta maaş + güvenlik', 'Düşük maaş + anlamlı iş'],
                      icon: '💰'
                    },
                    {
                      key: 'kariyerHizi',
                      label: 'Kariyer yükselişi konusundaki yaklaşımınız?',
                      secenek: ['Hızlı yükselme isterim', 'Dengeli ilerleme', 'Yavaş ama sağlam'],
                      icon: '📈'
                    },
                    {
                      key: 'girisimcilik',
                      label: 'Çalışma tercihiniz nedir?',
                      secenek: ['Kendi işimi kurmak isterim', 'Kurumsal kariyeri tercih ederim', 'İkisi de olabilir'],
                      icon: '🏢'
                    },
                    {
                      key: 'emeklilik',
                      label: 'Emeklilik planınız nasıl?',
                      secenek: ['Erken emeklilik (40\'larda)', 'Normal yaşta (60\'larda)', 'Çalışmaya devam etmek isterim'],
                      icon: '🏖️'
                    }
                  ].map((soru) => (
                    <div key={soru.key} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{soru.icon}</span>
                        <h4 className="font-medium text-gray-900">{soru.label}</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {soru.secenek.map((secenek, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              const yeniYaklasim = {...testVerileri.finansalYaklasim, [soru.key]: secenek};
                              veriGuncelle('finansalYaklasim', yeniYaklasim);
                            }}
                            className={`p-3 text-sm rounded-md border transition-colors ${
                              testVerileri.finansalYaklasim[soru.key] === secenek
                                ? 'border-blue-500 bg-blue-50 text-blue-900'
                                : 'border-gray-300 hover:bg-gray-100'
                            }`}
                          >
                            {secenek}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {aktifAdim === 4 && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={sonrakiAdim}
                      disabled={!adimTamamMi(4)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        adimTamamMi(4)
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Devam Et →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ADIM 5: Çalışma Tarzı */}
          {aktifAdim >= 5 && (
            <div className="bg-white rounded-lg shadow animate-fadeIn">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                    adimTamamMi(5) ? 'bg-green-500' : aktifAdim === 5 ? 'bg-blue-500' : 'bg-gray-400'
                  }`}>
                    {adimTamamMi(5) ? '✓' : '5'}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Çalışma Tarzı
                  </h3>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      key: 'stresAltindaPerformans',
                      label: 'Stres altında nasıl performans gösterirsiniz?',
                      secenek: ['Daha iyi performans gösteririm', 'Normal performansım', 'Performansım düşer'],
                      icon: '⚡'
                    },
                    {
                      key: 'liderlikIstegi',
                      label: 'Liderlik konusunda yaklaşımınız nedir?',
                      secenek: ['Lider olmak isterim', 'Takım üyesi olmayı tercih ederim', 'Bağımsız çalışmak isterim'],
                      icon: '👑'
                    },
                    {
                      key: 'elestiriAlma',
                      label: 'Eleştiri almaya yaklaşımınız nasıl?',
                      secenek: ['Yapıcı eleştiri hoşuma gider', 'Zorlanırım ama kabul ederim', 'Eleştiriden rahatsız olurum'],
                      icon: '💬'
                    },
                    {
                      key: 'multitasking',
                      label: 'Çoklu görev (multitasking) beceriniz nasıl?',
                      secenek: ['Çok iyiyim, severim', 'Halledebilirim', 'Tek işe odaklanmayı tercih ederim'],
                      icon: '🎯'
                    }
                  ].map((soru) => (
                    <div key={soru.key} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{soru.icon}</span>
                        <h4 className="font-medium text-gray-900">{soru.label}</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {soru.secenek.map((secenek, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              const yeniTarz = {...testVerileri.calismaTarzi, [soru.key]: secenek};
                              veriGuncelle('calismaTarzi', yeniTarz);
                            }}
                            className={`p-3 text-sm rounded-md border transition-colors ${
                              testVerileri.calismaTarzi[soru.key] === secenek
                                ? 'border-blue-500 bg-blue-50 text-blue-900'
                                : 'border-gray-300 hover:bg-gray-100'
                            }`}
                          >
                            {secenek}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {aktifAdim === 5 && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={sonrakiAdim}
                      disabled={!adimTamamMi(5)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        adimTamamMi(5)
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Devam Et →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ADIM 6: Çalışma Ortamı (Mevcut) */}
          {aktifAdim >= 6 && (
            <div className="bg-white rounded-lg shadow animate-fadeIn">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                    adimTamamMi(6) ? 'bg-green-500' : aktifAdim === 6 ? 'bg-blue-500' : 'bg-gray-400'
                  }`}>
                    {adimTamamMi(6) ? '✓' : '6'}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Çalışma Ortamı Tercihleri
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      key: 'ortam',
                      label: 'Tercih Ettiğiniz Çalışma Ortamı',
                      secenek: ['Kapalı Ofis', 'Açık Ofis', 'Uzaktan Çalışma', 'Saha/Dış Mekan', 'Hibrit', 'Serbest'],
                      icon: '🏢'
                    },
                    {
                      key: 'sekil',
                      label: 'Çalışma Şekli Tercihi',
                      secenek: ['Bireysel Çalışma', 'Takım Çalışması', 'Liderlik Pozisyonu', 'Karma'],
                      icon: '👥'
                    },
                    {
                      key: 'tempo',
                      label: 'Çalışma Temposu',
                      secenek: ['Sakin ve Düzenli', 'Orta Tempo', 'Hızlı ve Dinamik', 'Proje Bazlı'],
                      icon: '⚡'
                    },
                    {
                      key: 'seyahat',
                      label: 'Seyahat Etme İsteği',
                      secenek: ['Seyahat İstemiyorum', 'Nadiren', 'Bazen', 'Sık Sık'],
                      icon: '✈️'
                    }
                  ].map((tercih) => (
                    <div key={tercih.key} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{tercih.icon}</span>
                        <h4 className="font-medium text-gray-900">{tercih.label}</h4>
                      </div>
                      <div className="space-y-2">
                        {tercih.secenek.map((secenek, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              const yeniOrtam = {...testVerileri.calismaOrtami, [tercih.key]: secenek};
                              veriGuncelle('calismaOrtami', yeniOrtam);
                            }}
                            className={`w-full p-2 text-sm rounded-md border transition-colors text-left ${
                              testVerileri.calismaOrtami[tercih.key] === secenek
                                ? 'border-blue-500 bg-blue-50 text-blue-900'
                                : 'border-gray-300 hover:bg-gray-100'
                            }`}
                          >
                            {secenek}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {aktifAdim === 6 && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={sonrakiAdim}
                      disabled={!adimTamamMi(6)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        adimTamamMi(6)
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Devam Et →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ADIM 7: Yetkinlikler */}
          {aktifAdim >= 7 && (
            <div className="bg-white rounded-lg shadow animate-fadeIn">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                    adimTamamMi(7) ? 'bg-green-500' : aktifAdim === 7 ? 'bg-blue-500' : 'bg-gray-400'
                  }`}>
                    {adimTamamMi(7) ? '✓' : '7'}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Yetkinlik Öz-Değerlendirmesi
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Aşağıdaki becerilerde kendinizi 1-10 arası puanlayın
                </p>

                <div className="space-y-6">
                  {[
                    { key: 'matematik', label: 'Matematik / Sayısal Beceriler', icon: '🔢' },
                    { key: 'sozel', label: 'Sözel İletişim / Dil Becerileri', icon: '💬' }, 
                    { key: 'teknik', label: 'Teknik / El Becerisi', icon: '🔧' },
                    { key: 'liderlik', label: 'Liderlik / Yönetim', icon: '👑' },
                    { key: 'yaraticilik', label: 'Yaratıcılık / Sanatsal', icon: '🎨' },
                    { key: 'problem', label: 'Problem Çözme / Analitik Düşünce', icon: '🧩' },
                    { key: 'sosyal', label: 'Sosyal Beceriler / Empati', icon: '🤝' },
                    { key: 'organizasyon', label: 'Organizasyon / Planlama', icon: '📋' }
                  ].map((beceri) => (
                    <div key={beceri.key} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{beceri.icon}</span>
                          <span className="font-medium text-gray-900">{beceri.label}</span>
                        </div>
                        <div className="w-12 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          {testVerileri.yetkinlikler[beceri.key] || 0}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500 w-12">Zayıf</span>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={testVerileri.yetkinlikler[beceri.key] || 1}
                          onChange={(e) => {
                            const yeniYetkinlikler = {...testVerileri.yetkinlikler, [beceri.key]: parseInt(e.target.value)};
                            veriGuncelle('yetkinlikler', yeniYetkinlikler);
                          }}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-sm text-gray-500 w-12">Güçlü</span>
                      </div>
                    </div>
                  ))}
                </div>

                {aktifAdim === 7 && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={sonrakiAdim}
                      disabled={!adimTamamMi(7)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        adimTamamMi(7)
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Devam Et →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ADIM 8: Kişisel Gelişim */}
          {aktifAdim >= 8 && (
            <div className="bg-white rounded-lg shadow animate-fadeIn">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                    adimTamamMi(8) ? 'bg-green-500' : aktifAdim === 8 ? 'bg-blue-500' : 'bg-gray-400'
                  }`}>
                    {adimTamamMi(8) ? '✓' : '8'}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Kişisel Gelişim Yaklaşımı
                  </h3>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      key: 'ogrenmeTarzi',
                      label: 'Öğrenme tarzınız nasıl?',
                      secenek: ['Teorik / Kitap okuyarak', 'Pratik / Yaparak öğrenerek', 'İkisini birden harmanlayarak'],
                      icon: '📚'
                    },
                    {
                      key: 'yenilikVsRutin',
                      label: 'Yenilik ve rutin konusundaki tercihiniz?',
                      secenek: ['Sürekli değişim ve yenilik isterim', 'Dengeli - hem yenilik hem rutin', 'Rutinli ve öngörülebilir çalışma isterim'],
                      icon: '🔄'
                    },
                    {
                      key: 'mentorluk',
                      label: 'Öğrenme ve gelişim sürecinizde tercih ettiğiniz yaklaşım?',
                      secenek: ['Bağımsız öğrenir, kendi yolumu çizerim', 'Mentor veya rehber isterim', 'Takım halinde öğrenmeyi severim'],
                      icon: '🎯'
                    }
                  ].map((soru) => (
                    <div key={soru.key} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{soru.icon}</span>
                        <h4 className="font-medium text-gray-900">{soru.label}</h4>
                      </div>
                      <div className="space-y-2">
                        {soru.secenek.map((secenek, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              const yeniGelisim = {...testVerileri.kisiselGelisim, [soru.key]: secenek};
                              veriGuncelle('kisiselGelisim', yeniGelisim);
                            }}
                            className={`w-full p-3 text-sm rounded-md border transition-colors text-left ${
                              testVerileri.kisiselGelisim[soru.key] === secenek
                                ? 'border-blue-500 bg-blue-50 text-blue-900'
                                : 'border-gray-300 hover:bg-gray-100'
                            }`}
                          >
                            {secenek}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {aktifAdim === 8 && adimTamamMi(8) && (
                  <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white text-center">
                    <h4 className="text-xl font-bold mb-2">🎉 Test Tamamlandı!</h4>
                    <p className="mb-4">
                      Tüm sorular cevaplanmış. Şimdi AI ile kişiselleştirilmiş analiz yapılacak.
                    </p>
                    {analizediliyor ? (
                      <div className="inline-flex items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></div>
                        <span className="text-lg">AI Analizi Yapılıyor...</span>
                      </div>
                    ) : (
                      <button
                        onClick={analizBaslat}
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
                      >
                        🤖 AI Analizi Başlat
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Yardım Kutusu */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-3">
            💡 Bu Test Nasıl Çalışır?
          </h4>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• MBTI ve Holland test sonuçlarınızla kişiliğinizi analiz ediyoruz</p>
            <p>• İş değerleri ve yaşam tercihlerinizle motivasyonunuzu anlıyoruz</p>
            <p>• Çalışma tarzı ve becerilerinizle uygun meslek alanlarını belirliyoruz</p>
            <p>• AI destekli analiz ile size özel kariyer önerileri sunuyoruz</p>
          </div>
        </div>

      </main>
    </div>
  );
}

// Analiz Sonuçları Komponenti
function AnalizSonucu({ testVerileri }: { testVerileri: TestVerileri }) {
  // Mock AI analiz sonucu
  const analizSonucu = {
    kisilikOzeti: `${testVerileri.mbtiSonucu} kişiliği ve ${testVerileri.hollandKodu} ilgi profili ile yaratıcı ve analitik bir yapınız var. Yüksek değer verdiğiniz özgürlük ve gelişim odaklı yaklaşımınız sizi dinamik sektörlere yönlendiriyor.`,
    gucluYonler: [
      "Yaratıcı problem çözme",
      "Analitik düşünce",
      "Bağımsız çalışma",
      "Sürekli öğrenme isteği"
    ],
    gelisimAlanlari: [
      "Takım çalışması becerilerini geliştirin",
      "Stres yönetimi konusunda pratik yapın",
      "Liderlik deneyiminizi artırın"
    ],
    uygunMeslekler: [
      { isim: "UX/UI Tasarımcı", uygunluk: 96, aciklama: "Yaratıcılık ve teknik becerilerinizin mükemmel uyumu" },
      { isim: "Veri Analisti", uygunluk: 91, aciklama: "Analitik düşünce ve problem çözme becerilerinize uygun" },
      { isim: "Ürün Yöneticisi", uygunluk: 87, aciklama: "Stratejik düşünce ve inovasyon odaklı yaklaşımınıza uygun" },
      { isim: "Grafik Tasarımcı", uygunluk: 84, aciklama: "Yaratıcılık ve görsel becerilerinizi kullanabileceğiniz alan" },
      { isim: "İçerik Stratejisti", uygunluk: 82, aciklama: "İletişim ve yaratıcılık becerilerinizi birleştirebilirsiniz" }
    ]
  };

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
              AI Kişilik Analizi Sonuçları
            </h1>
            <div className="flex space-x-2">
              <button className="text-green-600 hover:text-green-800">PDF İndir</button>
              <button className="text-blue-600 hover:text-blue-800">Paylaş</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Test Bilgisi */}         
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Kişisel Analiz Tamamlandı! 🎉</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div>
              <div className="text-lg font-semibold">MBTI</div>
              <div className="text-purple-100">{testVerileri.mbtiSonucu}</div>
            </div>
            <div>
              <div className="text-lg font-semibold">Holland</div>
              <div className="text-purple-100">{testVerileri.hollandKodu}</div>
            </div>
            <div>
              <div className="text-lg font-semibold">Test Bölümü</div>
              <div className="text-purple-100">8/8 Tamamlandı</div>
            </div>
            <div>
              <div className="text-lg font-semibold">Analiz Durumu</div>
              <div className="text-purple-100">✓ Hazır</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sol Kolon - Ana Analiz */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Kişilik Özeti */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🧠 Kişilik Özetiniz
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {analizSonucu.kisilikOzeti}
              </p>
            </div>

            {/* Güçlü Yönler */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                ⭐ Güçlü Yönleriniz
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analizSonucu.gucluYonler.map((guc, index) => (
                  <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-green-800 font-medium">{guc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gelişim Alanları */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                📈 Gelişim Alanları
              </h3>
              <div className="space-y-3">
                {analizSonucu.gelisimAlanlari.map((alan, index) => (
                  <div key={index} className="flex items-start p-3 bg-orange-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                    <span className="text-orange-800 font-medium">{alan}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sağ Kolon - Meslek Önerileri */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🎯 Size Uygun Meslekler
              </h3>
              <div className="space-y-4">
                {analizSonucu.uygunMeslekler.map((meslek, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium text-gray-900">{meslek.isim}</h4>
                      <span className="text-lg font-bold text-blue-600">%{meslek.uygunluk}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{meslek.aciklama}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${meslek.uygunluk}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sonraki Adımlar */}
            <div className="mt-6 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                🚀 Sonraki Adımlar
              </h3>
              <div className="space-y-3">
                <Link
                  href="/career-discovery"
                  className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Meslek Detaylarını İncele
                </Link>
                <Link
                  href="/university-matcher"
                  className="block w-full bg-purple-600 text-white text-center py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Uygun Üniversiteleri Bul
                </Link>
                <Link
                  href="/chat"
                  className="block w-full bg-gray-600 text-white text-center py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
                >
                  AI Danışmanla Konuş
                </Link>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}

