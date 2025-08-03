'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Mesaj {
  id: number;
  metin: string;
  gonderici: 'kullanici' | 'ai';
  zaman: Date;
}

interface KategoriSoru {
  kategori: string;
  ikon: string;
  sorular: string[];
}

export default function SohbetSayfasi() {
  const [mesajlar, setMesajlar] = useState<Mesaj[]>([
    {
      id: 1,
      metin: "Merhaba! Ben sizin kişisel kariyer danışmanınızım. Size nasıl yardımcı olabilirim?",
      gonderici: 'ai',
      zaman: new Date()
    }
  ]);
  const [yeniMesaj, setYeniMesaj] = useState('');
  const [yukleniyorMu, setYukleniyorMu] = useState(false);
  const [kategoriAcik, setKategoriAcik] = useState(false);

  const kategoriliSorular: KategoriSoru[] = [
    {
      kategori: "🧭 Kariyer",
      ikon: "🧭",
      sorular: [
        "Hangi bölümü seçmeliyim?",
        "Mesleki gelişim önerileriniz neler?",
        "Kariyer değişikliği nasıl yapabilirim?"
      ]
    },
    {
      kategori: "🎓 Üniversite", 
      ikon: "🎓",
      sorular: [
        "Puanıma göre hangi üniversiteler uygun?",
        "Üniversite sıralaması önemli mi?",
        "Yurt dışında okuma fırsatları neler?"
      ]
    },
    {
      kategori: "📍 Şehir",
      ikon: "📍", 
      sorular: [
        "Hangi şehirde okumak daha iyi?",
        "Yaşam maliyetleri nasıl?",
        "İş imkanları hangi şehirde daha iyi?"
      ]
    },
    {
      kategori: "📈 Gelecek",
      ikon: "📈",
      sorular: [
        "Gelecekte hangi meslekler öne çıkacak?",
        "Teknoloji değişimi kariyeri nasıl etkiler?",
        "5 yıl sonraki hedeflerimi nasıl belirlerim?"
      ]
    }
  ];

  const mesajGonder = async () => {
    if (!yeniMesaj.trim()) return;

    // Kullanıcı mesajını ekle
    const kullaniciMesaji: Mesaj = {
      id: Date.now(),
      metin: yeniMesaj,
      gonderici: 'kullanici',
      zaman: new Date()
    };

    setMesajlar(prev => [...prev, kullaniciMesaji]);
    setYeniMesaj('');
    setYukleniyorMu(true);

    // Simüle edilmiş AI cevabı (gerçekte Gemini API çağrısı yapılacak)
    setTimeout(() => {
      const aiCevabi: Mesaj = {
        id: Date.now() + 1,
        metin: getAiCevabi(yeniMesaj),
        gonderici: 'ai',
        zaman: new Date()
      };
      
      setMesajlar(prev => [...prev, aiCevabi]);
      setYukleniyorMu(false);
    }, 1500);
  };

  const getAiCevabi = (soru: string): string => {
    // Basitleştirilmiş cevap sistemi (demo için)
    const sorulowerCase = soru.toLowerCase();
    
    if (sorulowerCase.includes('mühendislik') || sorulowerCase.includes('teknik')) {
      return "Mühendislik alanları için matematik ve fen bilimlerinde güçlü olmanız önemli. Hangi mühendislik dalıyla ilgileniyorsunuz? Bilgisayar, makine, endüstri gibi seçenekler var.";
    }
    
    if (sorulowerCase.includes('tıp') || sorulowerCase.includes('sağlık')) {
      return "Tıp ve sağlık alanları için yüksek puanlar gerekiyor. Fen bilimlerinde başarılı olmanız ve empati yeteneğinizin güçlü olması önemli. Alternatif olarak hemşirelik, fizyoterapi gibi alanları da değerlendirebilirsiniz.";
    }
    
    if (sorulowerCase.includes('puan') || sorulowerCase.includes('skor')) {
      return "Puanlarınızı değerlendirmek için TYT ve AYT skorlarınızı bilmem gerekiyor. Bu puanlara göre size en uygun bölümleri önerebilirim. Profilinizi güncelleyerek bu bilgileri paylaşabilirsiniz.";
    }
    
    if (sorulowerCase.includes('şehir') || sorulowerCase.includes('üniversite')) {
      return "Şehir seçimi de çok önemli! Yaşam maliyeti, sosyal olanaklar ve aile durumunuzu düşünerek karar vermelisiniz. Hangi şehirleri düşünüyorsunuz?";
    }
    
    return "Bu konuda size yardımcı olabilirim. Daha detaylı bilgi verebilmeniz için profilinizi tamamlamanızı ve değerlendirme testini almanızı öneririm. Böylece size daha kişiselleştirilmiş öneriler sunabilirim.";
  };

  const soruTikla = (soru: string) => {
    setYeniMesaj(soru);
    setKategoriAcik(false);
  };

  const zamanFormat = (tarih: Date) => {
    return tarih.toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/dashboard"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Dashboard'a Dön
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              AI Kariyer Danışmanı
            </h1>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">AI Danışman</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container - Sabit genişlik */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-xl h-full flex flex-col overflow-hidden">
          
          {/* AI Yetkinlik Kartı */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                🤖
              </div>
              <div className="flex-1">
                <div className="font-semibold">AI Kariyer Danışmanı</div>
                <div className="text-white/80 text-sm">Size şunları yapabilirim:</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div className="bg-white/10 rounded-lg p-2 text-center">
                <div className="text-lg">🎯</div>
                <div>Puana göre okul öner</div>
              </div>
              <div className="bg-white/10 rounded-lg p-2 text-center">
                <div className="text-lg">🔍</div>
                <div>Bölüm kıyasla</div>
              </div>
              <div className="bg-white/10 rounded-lg p-2 text-center">
                <div className="text-lg">🏙️</div>
                <div>Şehir yaşam maliyeti</div>
              </div>
              <div className="bg-white/10 rounded-lg p-2 text-center">
                <div className="text-lg">📈</div>
                <div>Kariyer rehberliği</div>
              </div>
            </div>
          </div>
          
          {/* Mesajlar Alanı */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {mesajlar.map((mesaj) => (
              <div
                key={mesaj.id}
                className={`flex ${mesaj.gonderici === 'kullanici' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-sm lg:max-w-md ${mesaj.gonderici === 'kullanici' ? 'order-2' : 'order-1'}`}>
                  {/* Mesaj Balonu */}
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm ${
                      mesaj.gonderici === 'kullanici'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{mesaj.metin}</p>
                  </div>
                  
                  {/* Zaman Etiketi */}
                  <div className={`mt-1 text-xs text-gray-500 ${
                    mesaj.gonderici === 'kullanici' ? 'text-right' : 'text-left'
                  }`}>
                    {zamanFormat(mesaj.zaman)}
                  </div>
                </div>
                
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  mesaj.gonderici === 'kullanici' 
                    ? 'bg-blue-600 text-white ml-2 order-3' 
                    : 'bg-gray-200 text-gray-600 mr-2 order-0'
                }`}>
                  {mesaj.gonderici === 'kullanici' ? '👤' : '🤖'}
                </div>
              </div>
            ))}
            
            {/* Yükleniyor animasyonu */}
            {yukleniyorMu && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 max-w-sm lg:max-w-md px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Önerilen Sorular - Kategorili */}
          {mesajlar.length === 1 && (
            <div className="px-6 py-4 border-t bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-600 font-medium">Örnek sorular:</p>
                <button
                  onClick={() => setKategoriAcik(!kategoriAcik)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {kategoriAcik ? 'Daha Az' : '+ Daha Fazla'}
                </button>
              </div>
              
              {!kategoriAcik ? (
                <div className="flex flex-wrap gap-2">
                  {kategoriliSorular.slice(0, 2).map((kategori, index) => (
                    <div key={index}>
                      {kategori.sorular.slice(0, 1).map((soru, soruIndex) => (
                        <button
                          key={soruIndex}
                          onClick={() => soruTikla(soru)}
                          className="text-xs bg-white border border-gray-300 rounded-full px-3 py-2 hover:bg-gray-100 transition-colors"
                        >
                          {kategori.ikon} {soru}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {kategoriliSorular.map((kategori, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="font-medium text-gray-700 mb-2 text-sm">
                        {kategori.kategori}
                      </div>
                      <div className="space-y-1">
                        {kategori.sorular.map((soru, soruIndex) => (
                          <button
                            key={soruIndex}
                            onClick={() => soruTikla(soru)}
                            className="block w-full text-left text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded transition-colors"
                          >
                            {soru}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Mesaj Gönderme Alanı */}
          <div className="p-6 border-t bg-gray-50">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={yeniMesaj}
                  onChange={(e) => setYeniMesaj(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && mesajGonder()}
                  placeholder="Mesajınızı yazın..."
                  className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  disabled={yukleniyorMu}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  💬
                </div>
              </div>
              <button
                onClick={mesajGonder}
                disabled={!yeniMesaj.trim() || yukleniyorMu}
                className={`px-6 py-3 rounded-2xl transition-all duration-200 font-medium ${
                  !yeniMesaj.trim() || yukleniyorMu
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                {yukleniyorMu ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  '📤'
                )}
              </button>
            </div>
            
            {/* Kısayol Tuşları */}
            <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
              <span>Enter tuşuna basarak gönderebilirsiniz</span>
              <div className="flex space-x-4">
                <Link href="/profile" className="hover:text-blue-600">📋 Profilim</Link>
                <Link href="/results" className="hover:text-blue-600">📊 Sonuçlarım</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}