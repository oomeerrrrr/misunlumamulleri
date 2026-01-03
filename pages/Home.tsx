
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="bg-[#fdfcf0]">
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-[0.4]"
            alt="Fırın Arkaplan"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <span className="inline-block px-4 py-1.5 bg-amber-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
            Bartın'ın Geleneksel Lezzeti
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
            EKMEĞİN EN <br/><span className="text-amber-500">TAZE</span> HALİ
          </h1>
          <p className="text-xl text-stone-200 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
            Taş fırınımızda odun ateşiyle pişen, ekşi mayalı ve tam buğdaylı ürünlerimizle sağlığı ve lezzeti sofranıza getiriyoruz.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/urunler" className="bg-amber-600 text-white px-10 py-5 rounded-2xl font-black hover:bg-amber-500 transition-all shadow-xl shadow-amber-900/20 active:scale-95 text-lg w-full sm:w-auto">
              Lezzetleri Keşfet
            </Link>
            <Link to="/iletisim" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black hover:bg-white/20 transition-all text-lg w-full sm:w-auto">
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-100 rounded-full blur-3xl opacity-50"></div>
            <img 
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800" 
              className="rounded-[3rem] shadow-2xl relative z-10 transform -rotate-2 hover:rotate-0 transition-transform duration-500"
              alt="Artisan Bread"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tighter leading-none">
              Gerçek Bir Fırın <br/><span className="text-amber-700">Deneyimi.</span>
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed italic">
              "Bizim için fırıncılık sadece hamur yoğurmak değil, bir mirası yaşatmaktır. 20 yılı aşkın süredir her sabah aynı heyecanla fırınımızı yakıyoruz."
            </p>
            <ul className="space-y-4">
              {[
                {t: "Doğal Maya", d: "Yıllanmış ekşi mayalarımızla sindirimi kolay ekmekler."},
                {t: "Taş Fırın", d: "Modern fırınların veremediği o eşsiz çıtırlık."},
                {t: "Yerel Malzeme", d: "Bartın köylerinden gelen taptaze süt ve unlar."}
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <div className="bg-amber-100 text-amber-800 p-2 rounded-lg mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                  </div>
                  <div>
                    <h4 className="font-black text-stone-800 uppercase text-xs tracking-widest">{item.t}</h4>
                    <p className="text-stone-500 text-sm">{item.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 bg-stone-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-black mb-16">Popüler Üretimlerimiz</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {n: "Köylü Ekmeği", i: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=400"},
              {n: "Elmalı Kurabiye", i: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=400"},
              {n: "Poğaça", i: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400"},
              {n: "Tatlı Çörek", i: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=400"}
            ].map((p, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="h-40 md:h-64 rounded-3xl overflow-hidden mb-4 relative">
                  <img src={p.i} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={p.n} />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs font-bold uppercase tracking-widest border border-white px-4 py-2">İncele</span>
                  </div>
                </div>
                <h5 className="font-bold text-lg">{p.n}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
