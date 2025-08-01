'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Beceri {
  id: string;
  isim: string;
  kategori: string;
  seviye: 'Başlangıç' | 'Orta' | 'İleri';
  sure: string;
  aciklama: string;
  gerekliOlduguMeslekler: string[];
  kaynaklar: {
    tip: 'Video' | 'Kurs' | 'Kitap' | 'Proje';
    baslik: string;
    link: string;
    ucretsiz: boolean;
  }[];
  oncelik: 'Yüksek' | 'Orta' | 'Düşük';
  uygunlukPuani?: number;
}

interface MeslekBeceriHaritasi {
  [key: string]: {
    temelBeceriler: string[];
    ileriSeviyeBeceriler: string[];
    onerilenOgrenmeRotasi: string[];
  };
}

export default function BeceriGelistirmeSayfasi() {
  const [secilenMeslek, setSecilenMeslek] = useState<string>('');
  const [mevcutBeceriler, setMevcutBeceriler] = useState<string[]>([]);
  const [beceriSeviyeleri, setBeceriSeviyeleri] = useState<Record<string, string>>({});
  const [ogrenmeTecihleri, setOgrenmeTecrcihleri] = useState({
    haftalikSure: '10-20 saat',
    ogrenmeStili: 'Video tabanlı',
    butce: 'Düşük bütçe (0-500₺/ay)',
    hedefSure: '6 ay içinde'
  });
  const [analizTamamlandi, setAnalizTamamlandi] = useState(false);
  const [motivasyonData, setMotivasyonData] = useState<any>(null);

  const meslekler = [
    'Yazılım Geliştirici',
    'Veri Analisti', 
    'Dijital Pazarlama Uzmanı',
    'Grafik Tasarımcı',
    'Proje Yöneticisi',
    'İnsan Kaynakları Uzmanı',
    'İçerik Editörü',
    'UI/UX Tasarımcı',
    'DevOps Uzmanı',
    'Siber Güvenlik Uzmanı',
    'İş Analisti',
    'Sosyal Medya Uzmanı'
  ];

  // Meslek-Beceri Haritası
  const meslekBeceriHaritasi: MeslekBeceriHaritasi = {
    'Yazılım Geliştirici': {
      temelBeceriler: ['JavaScript', 'Python', 'HTML/CSS', 'Git', 'React', 'Node.js'],
      ileriSeviyeBeceriler: ['Docker', 'AWS', 'MongoDB', 'TypeScript', 'GraphQL'],
      onerilenOgrenmeRotasi: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Git', 'Python']
    },
    'Veri Analisti': {
      temelBeceriler: ['Python', 'Excel', 'SQL', 'İstatistik', 'Pandas', 'Matplotlib'],
      ileriSeviyeBeceriler: ['Machine Learning', 'Tableau', 'Power BI', 'R', 'Spark'],
      onerilenOgrenmeRotasi: ['Excel', 'SQL', 'Python', 'Pandas', 'İstatistik', 'Matplotlib']
    },
    'Dijital Pazarlama Uzmanı': {
      temelBeceriler: ['Google Analytics', 'SEO', 'Social Media', 'Content Writing', 'Facebook Ads'],
      ileriSeviyeBeceriler: ['Google Ads', 'Email Marketing', 'Marketing Automation', 'A/B Testing'],
      onerilenOgrenmeRotasi: ['SEO', 'Google Analytics', 'Content Writing', 'Social Media', 'Facebook Ads']
    },
    'UI/UX Tasarımcı': {
      temelBeceriler: ['Figma', 'Photoshop', 'User Research', 'Wireframing', 'Prototyping'],
      ileriSeviyeBeceriler: ['Adobe XD', 'Sketch', 'InVision', 'Usability Testing', 'Design Systems'],
      onerilenOgrenmeRotasi: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Photoshop']
    }
  };

  const tumBeceriler = [
    // Teknik Beceriler
    'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'HTML/CSS', 'TypeScript',
    'Java', 'C#', 'PHP', 'MongoDB', 'Docker', 'AWS', 'Azure', 'Linux',
    // Tasarım Becerileri
    'Photoshop', 'Illustrator', 'Figma', 'Adobe XD', 'Sketch', 'InDesign', 'After Effects',
    // Pazarlama Becerileri
    'Google Analytics', 'SEO', 'Social Media', 'Content Writing', 'Facebook Ads', 'Google Ads',
    'Email Marketing', 'Marketing Automation', 'Influencer Marketing',
    // Analiz Becerileri
    'Excel', 'Power BI', 'Tableau', 'R', 'SPSS', 'Machine Learning', 'İstatistik', 'Pandas',
    'Matplotlib', 'Data Mining', 'Big Data',
    // Yönetim Becerileri
    'Project Management', 'Agile', 'Scrum', 'Leadership', 'Team Management', 'Public Speaking',
    // Genel Beceriler
    'İletişim', 'Problem Çözme', 'Sunum', 'Yazılı İletişim', 'Negotiation', 'Time Management'
  ];

  // Meslek seçildiğinde becerileri filtrele ve önceliklendir
  const filtrelenmisBeceriler = tumBeceriler.map(beceri => {
    let uygunlukPuani = 0;
    let oncelik: 'Yüksek' | 'Orta' | 'Düşük' = 'Düşük';
    
    if (secilenMeslek && meslekBeceriHaritasi[secilenMeslek]) {
      const meslekData = meslekBeceriHaritasi[secilenMeslek];
      if (meslekData.temelBeceriler.includes(beceri)) {
        uygunlukPuani = 100;
        oncelik = 'Yüksek';
      } else if (meslekData.ileriSeviyeBeceriler.includes(beceri)) {
        uygunlukPuani = 80;
        oncelik = 'Orta';
      } else {
        uygunlukPuani = 30;
        oncelik = 'Düşük';
      }
    }
    
    return { isim: beceri, uygunlukPuani, oncelik };
  }).sort((a, b) => b.uygunlukPuani - a.uygunlukPuani);

  // Motivasyon verilerini hesapla
  useEffect(() => {
    if (secilenMeslek && mevcutBeceriler.length > 0) {
      const meslekData = meslekBeceriHaritasi[secilenMeslek];
      if (meslekData) {
        const tumGerekliBeceiler = [...meslekData.temelBeceriler, ...meslekData.ileriSeviyeBeceriler];
        const sahipOlunanGerekliBeceiler = mevcutBeceriler.filter(beceri => 
          tumGerekliBeceiler.includes(beceri)
        );
        
        const uygunlukYuzdesi = Math.round((sahipOlunanGerekliBeceiler.length / tumGerekliBeceiler.length) * 100);
        const eksikBeceriler = tumGerekliBeceiler.filter(beceri => !mevcutBeceriler.includes(beceri));
        
        // Öğrenme süresi hesaplama
        const haftalikSureMap: Record<string, number> = {
          '5-10 saat': 7.5,
          '10-20 saat': 15,
          '20+ saat': 25
        };
        
        const haftalikSure = haftalikSureMap[ogrenmeTecihleri.haftalikSure] || 15;
        const tahminiToplamsaat = eksikBeceriler.length * 20; // Her beceri için ortalama 20 saat
        const tahminiHafta = Math.ceil(tahminiToplamsaat / haftalikSure);
        
        setMotivasyonData({
          uygunlukYuzdesi,
          eksikBeceriler: eksikBeceriler.slice(0, 5), // İlk 5 önemli eksik beceri
          tahminiSure: `${tahminiHafta} hafta`,
          sahipOlunanBeceiler: sahipOlunanGerekliBeceiler.length,
          toplamGerekliBecerier: tumGerekliBeceiler.length
        });
      }
    } else {
      setMotivasyonData(null);
    }
  }, [secilenMeslek, mevcutBeceriler, ogrenmeTecihleri.haftalikSure]);

  const beceriSecimToggle = (beceri: string) => {
    setMevcutBeceriler(prev => {
      if (prev.includes(beceri)) {
        // Beceri seçimi kaldırılıyorsa seviyesini de sil
        setBeceriSeviyeleri(prevSeviye => {
          const yeniSeviye = {...prevSeviye};
          delete yeniSeviye[beceri];
          return yeniSeviye;
        });
        return prev.filter(b => b !== beceri);
      } else if (prev.length < 15) { // Maksimum 15 beceri
        // Beceri seviyesi dialog'unu göster
        setBeceriSeviyeleri(prevSeviye => ({
          ...prevSeviye,
          [beceri]: 'Başlangıç'
        }));
        return [...prev, beceri];
      } else {
        alert('Odaklı kalmanız için maksimum 15 beceri seçebilirsiniz.');
        return prev;
      }
    });
  };

  const analizBaslat = () => {
    if (!secilenMeslek) {
      alert('Lütfen hedef mesleğinizi seçin.');
      return;
    }
    if (mevcutBeceriler.length === 0) {
      alert('Lütfen en az bir mevcut beceri seçin.');
      return;
    }
    setAnalizTamamlandi(true);
  };

  if (analizTamamlandi) {
    const meslekData = meslekBeceriHaritasi[secilenMeslek];
    const tumGerekliBeceiler = meslekData ? [...meslekData.temelBeceriler, ...meslekData.ileriSeviyeBeceriler] : [];
    const eksikBeceriler = tumGerekliBeceiler.filter(beceri => !mevcutBeceriler.includes(beceri));
    
    return <BeceriGelistirmePlani 
      meslekAdi={secilenMeslek} 
      mevcutBeceriler={mevcutBeceriler}
      eksikBeceriler={eksikBeceriler}
      ogrenmeTecihleri={ogrenmeTecihleri}
      motivasyonData={motivasyonData}
      onGeriDon={() => setAnalizTamamlandi(false)} 
    />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/dashboard"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Dashboard'a Dön
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Akıllı Beceri Geliştirme Planlayıcısı
            </h1>
            <div></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Başlık */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🎯 Kariyerine Özel Beceri Rotanı Çiz
          </h2>
          <p className="text-lg text-gray-600">
            AI destekli analiz ile eksik becerilerini belirle, kişiselleştirilmiş öğrenme planını oluştur
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sol Kolon - Ana Form */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Hedef Meslek Seçimi */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                1. Hedef Mesleğiniz
              </h3>
              <select 
                value={secilenMeslek}
                onChange={(e) => {
                  setSecilenMeslek(e.target.value);
                  setMevcutBeceriler([]); // Meslek değişince becerileri sıfırla
                  setBeceriSeviyeleri({});
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-medium"
              >
                <option value="">Mesleğinizi seçin...</option>
                {meslekler.map(meslek => (
                  <option key={meslek} value={meslek}>{meslek}</option>
                ))}
              </select>
              
              {secilenMeslek && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg animate-fadeIn">
                  <h4 className="font-semibold text-blue-900 mb-2">🔥 {secilenMeslek} için Kritik Beceriler:</h4>
                  <div className="flex flex-wrap gap-2">
                    {meslekBeceriHaritasi[secilenMeslek]?.temelBeceriler.slice(0, 6).map(beceri => (
                      <span key={beceri} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full font-medium">
                        {beceri}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mevcut Beceriler */}
            {secilenMeslek && (
              <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <span className="text-2xl mr-3">💪</span>
                    2. Mevcut Becerileriniz
                  </h3>
                  <div className="text-sm text-gray-500">
                    Seçilen: {mevcutBeceriler.length}/15
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Sahip olduğunuz becerileri seçin. <strong>{secilenMeslek}</strong> için önemli olanlar üstte gösteriliyor.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {filtrelenmisBeceriler.map(beceri => {
                    const seciliMi = mevcutBeceriler.includes(beceri.isim);
                    const oncelikRengi = beceri.oncelik === 'Yüksek' ? 'border-red-400 bg-red-50' : 
                                       beceri.oncelik === 'Orta' ? 'border-yellow-400 bg-yellow-50' : 
                                       'border-gray-300 bg-gray-50';
                    
                    return (
                      <div key={beceri.isim} className="relative">
                        <button
                          onClick={() => beceriSecimToggle(beceri.isim)}
                          className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-200 ${
                            seciliMi
                              ? 'border-green-500 bg-green-100 text-green-900 shadow-md transform scale-105'
                              : `${oncelikRengi} text-gray-700 hover:shadow-md hover:scale-102`
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{beceri.isim}</span>
                            <div className="flex items-center space-x-1">
                              {beceri.oncelik === 'Yüksek' && (
                                <span className="text-red-500 text-xs">🔥</span>
                              )}
                              {seciliMi && (
                                <span className="text-green-600 text-sm">✓</span>
                              )}
                            </div>
                          </div>
                        </button>
                        
                        {/* Beceri Seviyesi Seçimi */}
                        {seciliMi && (
                          <div className="mt-2 animate-fadeIn">
                            <select
                              value={beceriSeviyeleri[beceri.isim] || 'Başlangıç'}
                              onChange={(e) => setBeceriSeviyeleri(prev => ({
                                ...prev,
                                [beceri.isim]: e.target.value
                              }))}
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                              <option value="Başlangıç">🌱 Başlangıç</option>
                              <option value="Orta">🌿 Orta Seviye</option>
                              <option value="İleri">🌳 İleri Seviye</option>
                            </select>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Seçili Beceriler Özeti */}
                {mevcutBeceriler.length > 0 && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">✅ Seçili Becerileriniz:</h4>
                    <div className="flex flex-wrap gap-2">
                      {mevcutBeceriler.map(beceri => (
                        <span key={beceri} className="px-3 py-1 bg-green-600 text-white text-sm rounded-full flex items-center">
                          {beceri}
                          <span className="ml-1 text-xs opacity-80">
                            ({beceriSeviyeleri[beceri] || 'Başlangıç'})
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Öğrenme Tercihleri */}
            {mevcutBeceriler.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-3">🎓</span>
                  3. Öğrenme Tercihleriniz
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Haftalık Çalışma Süreniz
                    </label>
                    <select 
                      value={ogrenmeTecihleri.haftalikSure}
                      onChange={(e) => setOgrenmeTecrcihleri(prev => ({...prev, haftalikSure: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="5-10 saat">5-10 saat (Yavaş)</option>
                      <option value="10-20 saat">10-20 saat (Normal)</option>
                      <option value="20+ saat">20+ saat (Hızlı)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Öğrenme Tarzınız
                    </label>
                    <select 
                      value={ogrenmeTecihleri.ogrenmeStili}
                      onChange={(e) => setOgrenmeTecrcihleri(prev => ({...prev, ogrenmeStili: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Video tabanlı">📹 Video Tabanlı</option>
                      <option value="Metin tabanlı">📚 Metin Tabanlı</option>
                      <option value="Proje tabanlı">🛠️ Proje Tabanlı</option>
                      <option value="Karma">🔄 Karma Yöntem</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aylık Eğitim Bütçeniz
                    </label>
                    <select 
                      value={ogrenmeTecihleri.butce}
                      onChange={(e) => setOgrenmeTecrcihleri(prev => ({...prev, butce: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Sadece ücretsiz">💚 Sadece Ücretsiz</option>
                      <option value="Düşük bütçe (0-500₺/ay)">💛 Düşük Bütçe (0-500₺)</option>
                      <option value="Orta bütçe (500-1500₺/ay)">🧡 Orta Bütçe (500-1500₺)</option>
                      <option value="Yüksek bütçe (1500₺+/ay)">❤️ Yüksek Bütçe (1500₺+)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hedef Tamamlama Süresi
                    </label>
                    <select 
                      value={ogrenmeTecihleri.hedefSure}
                      onChange={(e) => setOgrenmeTecrcihleri(prev => ({...prev, hedefSure: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="3 ay içinde">⚡ 3 Ay İçinde</option>
                      <option value="6 ay içinde">🎯 6 Ay İçinde</option>
                      <option value="1 yıl içinde">📅 1 Yıl İçinde</option>
                      <option value="Zaman sınırı yok">♾️ Zaman Sınırı Yok</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Sağ Kolon - Motivasyon & Bilgi */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Motivasyon Kutusu */}
            {motivasyonData && (
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-6 text-white animate-fadeIn">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <span className="mr-2">🎯</span>
                  Hedefinize Ne Kadar Yakınsınız?
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Uygunluk Oranı</span>
                      <span className="font-bold text-xl">{motivasyonData.uygunlukYuzdesi}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div 
                        className="bg-white h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${motivasyonData.uygunlukYuzdesi}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-2xl font-bold">{motivasyonData.sahipOlunanBeceiler}</div>
                      <div className="text-xs opacity-90">Sahip Olduğunuz</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-2xl font-bold">{motivasyonData.eksikBeceriler.length}</div>
                      <div className="text-xs opacity-90">Eksik Beceri</div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">🚀 Tahmini Öğrenme Süresi</h4>
                    <div className="text-2xl font-bold">{motivasyonData.tahminiSure}</div>
                    <div className="text-xs opacity-90 mt-1">Mevcut çalışma hızınızla</div>
                  </div>
                  
                  {motivasyonData.eksikBeceriler.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">📚 Öncelikli Öğrenilecekler:</h4>
                      <div className="space-y-1">
                        {motivasyonData.eksikBeceriler.slice(0, 3).map((beceri: string, index: number) => (
                          <div key={beceri} className="text-sm bg-white/10 rounded px-2 py-1">
                            {index + 1}. {beceri}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* AI Analiz Butonu */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI Beceri Analizi</h3>
              <p className="text-gray-600 text-sm mb-4">
                Seçimlerinize göre kişiselleştirilmiş öğrenme rotanızı oluşturacağız
              </p>
              <button
                onClick={analizBaslat}
                disabled={!secilenMeslek || mevcutBeceriler.length === 0}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  secilenMeslek && mevcutBeceriler.length > 0
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {secilenMeslek && mevcutBeceriler.length > 0 ? (
                  <>
                    <span className="mr-2">🚀</span>
                    Kişisel Rotamı Oluştur
                  </>
                ) : (
                  <>
                    <span className="mr-2">⏳</span>
                    Meslek ve Beceri Seçimi Bekleniyor
                  </>
                )}
              </button>
            </div>

            {/* Popüler Beceriler 2024 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🔥 2024'ün En Popüler Becerileri</h3>
              <div className="space-y-3">
                {[
                  { beceri: 'Yapay Zeka & ChatGPT', trend: '+65%', renk: 'text-red-600' },
                  { beceri: 'Python Programlama', trend: '+45%', renk: 'text-orange-600' },
                  { beceri: 'Cloud Computing', trend: '+38%', renk: 'text-yellow-600' },
                  { beceri: 'Data Analysis', trend: '+32%', renk: 'text-green-600' },
                  { beceri: 'UI/UX Design', trend: '+28%', renk: 'text-blue-600' }
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!mevcutBeceriler.includes(item.beceri)) {
                        beceriSecimToggle(item.beceri);
                      }
                    }}
                    className="w-full flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                  >
                    <div>
                      <div className="font-medium text-gray-900">{item.beceri}</div>
                      <div className="text-xs text-gray-500">Tıklayarak ekle</div>
                    </div>
                    <div className={`font-bold ${item.renk}`}>{item.trend}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* İpuçları */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">💡 Başarı İpuçları</h3>
              <div className="space-y-2 text-sm text-yellow-800">
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Mevcut seviyenizi dürüstçe değerlendirin</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Hedef mesleğe özel becerilere odaklanın</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Küçük adımlarla başlayın, tutarlı olun</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Pratik projelerle öğrendiklerinizi uygulayın</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}

// Gelişmiş Beceri Geliştirme Planı Komponenti
function BeceriGelistirmePlani({ 
  meslekAdi, 
  mevcutBeceriler, 
  eksikBeceriler, 
  ogrenmeTecihleri, 
  motivasyonData,
  onGeriDon 
}: {
  meslekAdi: string;
  mevcutBeceriler: string[];
  eksikBeceriler: string[];
  ogrenmeTecihleri: any;
  motivasyonData: any;
  onGeriDon: () => void;
}) {
  const [secilenBeceri, setSecilenBeceri] = useState<string | null>(null);
  const [planKaydetildi, setPlanKaydetildi] = useState(false);

  // Mock öğrenme kaynakları
  const ogrenmeKaynaklari: Record<string, any> = {
    'Python': {
      kaynaklar: [
        { tip: 'Video', baslik: 'Python Crash Course', provider: 'YouTube', ucretsiz: true, sure: '4 saat' },
        { tip: 'Kurs', baslik: 'Python for Everybody', provider: 'Coursera', ucretsiz: true, sure: '8 hafta' },
        { tip: 'Proje', baslik: 'Real Python Projects', provider: 'GitHub', ucretsiz: true, sure: '2 hafta' }
      ],
      onerilenRotasyon: '1. Temel syntax → 2. Veri yapıları → 3. Pratik projeler'
    },
    'JavaScript': {
      kaynaklar: [
        { tip: 'Video', baslik: 'JavaScript Fundamentals', provider: 'freeCodeCamp', ucretsiz: true, sure: '6 saat' },
        { tip: 'Kurs', baslik: 'The Complete JavaScript Course', provider: 'Udemy', ucretsiz: false, sure: '12 hafta' },
        { tip: 'Proje', baslik: '30 Days of JavaScript', provider: 'GitHub', ucretsiz: true, sure: '1ay' }
      ],
      onerilenRotasyon: '1. Temel kavramlar → 2. DOM manipülasyonu → 3. Modern JavaScript'
    }
  };

  // Haftalık öğrenme planı oluştur
  const haftalikPlan = eksikBeceriler.slice(0, 12).map((beceri, index) => ({
    hafta: index + 1,
    beceri,
    hedef: `${beceri} temellerini öğren`,
    aktiviteler: [`${beceri} temel kavramları`, `Pratik alıştırmalar`, `Proje uygulaması`],
    kaynaklar: ogrenmeKaynaklari[beceri]?.kaynaklar.slice(0, 2) || [
      { tip: 'Video', baslik: `${beceri} Tutorial`, provider: 'YouTube', ucretsiz: true, sure: '2-4 saat' }
    ]
  }));

  const planKaydet = () => {
    setPlanKaydetildi(true);
    // Here you would normally save to backend/localStorage
    setTimeout(() => setPlanKaydetildi(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={onGeriDon}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Geri Dön
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              {meslekAdi} - Kişisel Öğrenme Rotanız
            </h1>
            <div className="flex space-x-2">
              <button 
                onClick={planKaydet}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                {planKaydetildi ? '✅ Kaydedildi' : '💾 Planı Kaydet'}
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                📄 PDF İndir
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Başarı Durumu */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 mb-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{motivasyonData?.uygunlukYuzdesi || 0}%</div>
              <div className="text-green-100">Mevcut Uygunluk</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{eksikBeceriler.length}</div>
              <div className="text-green-100">Öğrenilecek Beceri</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{motivasyonData?.tahminiSure || '12 hafta'}</div>
              <div className="text-green-100">Tahmini Süre</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">🎯</div>
              <div className="text-green-100">{meslekAdi}</div>
            </div>
          </div>
          
          <div className="mt-6 bg-white/10 rounded-lg p-4">
            <h3 className="font-bold mb-2">🚀 Hedefiniz:</h3>
            <p className="text-green-100">
              {motivasyonData?.tahminiSure} içinde <strong>{meslekAdi}</strong> pozisyonu için %90+ uygunluk seviyesine ulaşacaksınız!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sol Kolon - Haftalık Plan */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3">📅</span>
              Haftalık Öğrenme Rotanız
            </h3>
            
            <div className="space-y-4">
              {haftalikPlan.map((hafta) => (
                <div key={hafta.hafta} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                          {hafta.hafta}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">{hafta.beceri}</h4>
                          <p className="text-gray-600">{hafta.hedef}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSecilenBeceri(secilenBeceri === hafta.beceri ? null : hafta.beceri)}
                        className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                      >
                        {secilenBeceri === hafta.beceri ? 'Kapat' : 'Detaylar'}
                      </button>
                    </div>

                    {/* Aktiviteler */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                      {hafta.aktiviteler.map((aktivite, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                          <div className="text-sm font-medium text-gray-800">{aktivite}</div>
                        </div>
                      ))}
                    </div>

                    {/* Kaynaklar Önizlemesi */}
                    <div className="flex flex-wrap gap-2">
                      {hafta.kaynaklar.map((kaynak: any, index: number) => (
                        <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full flex items-center">
                          {kaynak.tip === 'Video' ? '📹' : kaynak.tip === 'Kurs' ? '🎓' : '🛠️'}
                          <span className="ml-1">{kaynak.baslik}</span>
                          {kaynak.ucretsiz && <span className="ml-1 text-green-600">🆓</span>}
                        </span>
                      ))}
                    </div>

                    {/* Genişletilmiş Detaylar */}
                    {secilenBeceri === hafta.beceri && (
                      <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
                        <h5 className="font-bold text-gray-900 mb-3">📚 Detaylı Öğrenme Kaynakları:</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {hafta.kaynaklar.map((kaynak: any, index: number) => (
                            <div key={index} className="bg-blue-50 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-900">{kaynak.baslik}</span>
                                <span className="text-xs text-gray-500">{kaynak.sure}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{kaynak.provider}</span>
                                <div className="flex items-center space-x-2">
                                  {kaynak.ucretsiz && (
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Ücretsiz</span>
                                  )}
                                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700">
                                    Başla →
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {ogrenmeKaynaklari[hafta.beceri]?.onerilenRotasyon && (
                          <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                            <h6 className="font-medium text-yellow-900 mb-1">💡 Önerilen Öğrenme Sırası:</h6>
                            <p className="text-sm text-yellow-800">{ogrenmeKaynaklari[hafta.beceri].onerilenRotasyon}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sağ Kolon - İlerleme & Motivasyon */}
          <div className="space-y-6">
            
            {/* İlerleme Takibi */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📊</span>
                İlerleme Durumunuz
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Genel İlerleme</span>
                    <span className="text-sm font-bold">%5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full" style={{ width: '5%' }} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-600">0</div>
                    <div className="text-xs text-blue-800">Tamamlanan</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-orange-600">1</div>
                    <div className="text-xs text-orange-800">Devam Eden</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bu Haftanın Odağı */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-3">🎯 Bu Haftanın Odağı</h3>
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <div className="font-bold text-lg">{eksikBeceriler[0] || 'JavaScript'}</div>
                <div className="text-purple-100 text-sm">Temel kavramları öğrenmeye odaklan</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="mr-2">📹</span>
                  <span>2 saat video izle</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">💻</span>
                  <span>3 saat pratik yap</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🛠️</span>
                  <span>1 mini proje tamamla</span>
                </div>
              </div>
            </div>

            {/* Motivasyon Merkezi */}
            <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-3">🚀 Motivasyon Merkezi</h3>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="font-semibold">Günlük Hedef</div>
                  <div className="text-sm text-green-100">1 saat öğrenme + 30 dk pratik</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="font-semibold">Bu Ayın Başarısı</div>
                  <div className="text-sm text-green-100">3 yeni beceri kazandın! 🎉</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="font-semibold">Topluluk Desteği</div>
                  <div className="text-sm text-green-100">127 kişi aynı hedefte seninle</div>
                </div>
              </div>
              
              <Link 
                href="/chat"
                className="block w-full mt-4 bg-white text-green-600 text-center py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                💬 AI Mentor ile Konuş
              </Link>
            </div>

            {/* Paylaşım ve Export */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📤 Planınızı Paylaşın</h3>
              <div className="space-y-3">
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                  📧 Email Gönder
                </button>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  📄 PDF İndir
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                  📱 Takvime Ekle
                </button>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}