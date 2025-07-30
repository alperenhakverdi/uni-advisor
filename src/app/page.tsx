import Link from 'next/link';

export default function AnaSayfa() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Üniversite Tercih Danışmanı
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Yapay zeka destekli akıllı tercih sistemi
        </p>
        
        <div className="space-x-4">
          <Link 
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block text-center"
          >
            Giriş Yap
          </Link>
          <button className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
            Kayıt Ol
          </button>
        </div>
      </div>
    </div>
  );
}