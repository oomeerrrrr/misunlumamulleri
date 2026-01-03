
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-stone-800 mb-4">Bizimle İletişime Geçin</h1>
          <p className="text-stone-500 max-w-2xl mx-auto italic">Taze ürünlerimiz ve siparişleriniz için Bartın şubemize bekleriz.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-stone-200">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Mesajınız iletildi.'); }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Ad Soyad</label>
                  <input type="text" className="w-full bg-stone-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-amber-500" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">E-posta</label>
                  <input type="email" className="w-full bg-stone-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-amber-500" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Mesajınız</label>
                <textarea rows={5} className="w-full bg-stone-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-amber-500" required></textarea>
              </div>
              <button className="w-full bg-amber-700 text-white py-4 rounded-xl font-bold hover:bg-amber-800 transition-all shadow-lg shadow-amber-100">Gönder</button>
            </form>
          </div>

          <div className="space-y-12 py-6">
            <div>
              <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-3">Mağazamız</h3>
              <p className="text-stone-500 leading-relaxed font-medium">Kemer Köprü, 74100<br />Bartın Merkez / Bartın</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-3">Çalışma Saatleri</h3>
              <p className="text-stone-500">Haftanın Her Günü: 06:30 - 22:00</p>
              <p className="text-amber-600 font-bold mt-2">Haftanın her günü kesintisiz hizmetinizdeyiz.</p>
            </div>

            <div className="p-8 bg-amber-50 rounded-3xl border border-amber-100">
              <h4 className="font-black text-amber-800 uppercase tracking-tighter mb-2">Hızlı Sipariş Hattı</h4>
              <p className="text-sm text-amber-700/70 mb-4">Siparişleriniz için bizi direkt arayabilirsiniz.</p>
              <a href="tel:05308482429" className="text-2xl font-black text-amber-800 hover:underline">0530 848 2429</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
