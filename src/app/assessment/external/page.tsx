'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  
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

  // AI Analizi başlatma - Görev 4 için güncellendi
  const analizBaslat = async () => {
    setAnalizediliyor(true);
    // Mock AI analizi (3 saniye)
    setTimeout(() => {
      setAnalizediliyor(false);
      // Results sayfasına yönlendir
      router.push('/results');
    }, 3000);
  };

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

          {/* ADIM 6: Çalışma Ortamı */}
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

          {/* ADIM 7: Yetkinlikler - GELİŞTİRİLMİŞ SLIDER İLE */}
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
                        <div className="w-14 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold shadow-sm">
                          {testVerileri.yetkinlikler[beceri.key] || 1}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500 w-12 text-center">Zayıf</span>
                        <div className="flex-1 relative">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={testVerileri.yetkinlikler[beceri.key] || 1}
                            onChange={(e) => {
                              const yeniYetkinlikler = {...testVerileri.yetkinlikler, [beceri.key]: parseInt(e.target.value)};
                              veriGuncelle('yetkinlikler', yeniYetkinlikler);
                            }}
                            className="w-full h-4 bg-gray-400 rounded-full appearance-none cursor-pointer 
                                     [&::-webkit-slider-thumb]:appearance-none 
                                     [&::-webkit-slider-thumb]:w-6 
                                     [&::-webkit-slider-thumb]:h-6 
                                     [&::-webkit-slider-thumb]:bg-blue-600 
                                     [&::-webkit-slider-thumb]:rounded-full 
                                     [&::-webkit-slider-thumb]:shadow-lg
                                     [&::-webkit-slider-thumb]:border-2
                                     [&::-webkit-slider-thumb]:border-white
                                     [&::-webkit-slider-thumb]:hover:bg-blue-700
                                     [&::-webkit-slider-thumb]:transition-colors
                                     [&::-moz-range-thumb]:w-6
                                     [&::-moz-range-thumb]:h-6
                                     [&::-moz-range-thumb]:bg-blue-600
                                     [&::-moz-range-thumb]:rounded-full
                                     [&::-moz-range-thumb]:border-none
                                     [&::-moz-range-thumb]:shadow-lg
                                     [&::-moz-range-track]:bg-gray-400
                                     [&::-moz-range-track]:h-4
                                     [&::-moz-range-track]:rounded-full"
                          />
                          {/* Slider track değer göstergesi */}
                          <div 
                            className="absolute top-0 left-0 h-4 bg-blue-200 rounded-full pointer-events-none transition-all duration-200"
                            style={{ width: `${((testVerileri.yetkinlikler[beceri.key] || 1) - 1) / 9 * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500 w-12 text-center">Güçlü</span>
                      </div>
                      
                      {/* Değer göstergeli sayılar */}
                      <div className="flex justify-between mt-2 px-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <span 
                            key={num} 
                            className={`text-xs ${
                              (testVerileri.yetkinlikler[beceri.key] || 1) === num 
                                ? 'text-blue-600 font-bold' 
                                : 'text-gray-400'
                            }`}
                          >
                            {num}
                          </span>
                        ))}
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