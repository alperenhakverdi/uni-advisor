'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Mesaj {
  id: number;
  metin: string;
  gonderici: 'kullanici' | 'ai';
  zaman: Date;
}

export default function SohbetSayfasi() {
  const [mesajlar, setMesajlar] = useState<Mesaj[]>([
    {
      id: 1,
      metin: "Merhaba! Ben sizin kişisel üniversite tercih danışmanınızım. Size nasıl yardımcı olabilirim?",
      gonderici: 'ai',
      zaman: new Date()
    }
  ]);
  const [yeniMesaj, setYeniMesaj] = useState('');
  const [yukleniyorMu, setYukleniyorMu] = useState(false);

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

  const oneriSorulari = [
    "Hangi bölümü seçmeliyim?",
    "Puanıma göre hangi üniversiteler uygun?",
    "Mühendislik mi tıp mı daha iyi?",
    "Şehir seçimi nasıl yapmalıyım?"
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/dashboard"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Dashboard'a Dön
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              AI Danışman
            </h1>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Aktif</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-lg shadow h-full flex flex-col">
          
          {/* Mesajlar */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {mesajlar.map((mesaj) => (
              <div
                key={mesaj.id}
                className={`flex ${mesaj.gonderici === 'kullanici' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    mesaj.gonderici === 'kullanici'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{mesaj.metin}</p>
                  <p className={`text-xs mt-1 ${
                    mesaj.gonderici === 'kullanici' ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {mesaj.zaman.toLocaleTimeString('tr-TR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Yükleniyor animasyonu */}
            {yukleniyorMu && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Önerilen Sorular */}
          {mesajlar.length === 1 && (
            <div className="px-4 py-2 border-t bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">Örnek sorular:</p>
              <div className="flex flex-wrap gap-2">
                {oneriSorulari.map((soru, index) => (
                  <button
                    key={index}
                    onClick={() => setYeniMesaj(soru)}
                    className="text-xs bg-white border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-100 transition-colors"
                  >
                    {soru}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mesaj Gönderme */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={yeniMesaj}
                onChange={(e) => setYeniMesaj(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && mesajGonder()}
                placeholder="Mesajınızı yazın..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={yukleniyorMu}
              />
              <button
                onClick={mesajGonder}
                disabled={!yeniMesaj.trim() || yukleniyorMu}
                className={`px-4 py-2 rounded-md transition-colors ${
                  !yeniMesaj.trim() || yukleniyorMu
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Gönder
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}