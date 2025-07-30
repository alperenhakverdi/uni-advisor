import Link from 'next/link';

export default function ProfilSayfasi() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/dashboard"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Dashboard'a Dön
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Profil Düzenle
            </h1>
            <div></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          <form className="space-y-6">
            
            {/* Kişisel Bilgiler */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Kişisel Bilgiler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Adınız"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soyad
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Soyadınız"
                  />
                </div>
              </div>
            </div>

            {/* İletişim Bilgileri */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                İletişim Bilgileri
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ornek@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yaş
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Yaşınızı seçin</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Akademik Bilgiler */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Akademik Bilgiler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TYT Puanı
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="TYT puanınız"
                    min="0"
                    max="500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    AYT Puanı
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="AYT puanınız"
                    min="0"
                    max="500"
                  />
                </div>
              </div>
            </div>

            {/* İlgi Alanları */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                İlgi Alanları
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'Matematik', 'Fizik', 'Kimya', 'Biyoloji',
                  'Edebiyat', 'Tarih', 'Coğrafya', 'Felsefe',
                  'Bilgisayar', 'Sanat', 'Müzik', 'Spor'
                ].map((alan) => (
                  <label key={alan} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{alan}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Hedefler */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Gelecek Hedefleri
              </h2>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Gelecekle ilgili hedeflerinizi, hayallerinizi ve planlarınızı yazın..."
              />
            </div>

            {/* Butonlar */}
            <div className="flex justify-end space-x-4">
              <Link
                href="/dashboard"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                İptal
              </Link>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Profili Kaydet
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}