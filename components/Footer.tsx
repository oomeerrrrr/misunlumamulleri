
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex flex-col leading-none">
              <span className="text-3xl font-black text-amber-700 tracking-tighter">MİS</span>
              <span className="text-[11px] font-bold text-gray-400 tracking-[0.25em] uppercase">Unlu Mamülleri</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium">
              Geleneksel lezzetlerin modern durağı. Bartın'ın kalbinde taptaze ürünlerimizle hizmetinizdeyiz.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Navigasyon</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm font-bold text-gray-600 hover:text-amber-700 transition">Anasayfa</Link></li>
              <li><Link to="/urunler" className="text-sm font-bold text-gray-600 hover:text-amber-700 transition">Ürünlerimiz</Link></li>
              <li><Link to="/iletisim" className="text-sm font-bold text-gray-600 hover:text-amber-700 transition">İletişim</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Lokasyon</h4>
            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-600">
                Kemer Köprü, 74100<br />Bartın Merkez / Bartın
              </p>
              <div className="pt-2">
                <p className="text-[10px] font-black text-amber-700 uppercase mb-1">Hızlı İletişim</p>
                <a href="tel:05308482429" className="text-lg font-black text-gray-900 hover:text-amber-700">0530 848 2429</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">&copy; 2024 Mis Unlu Mamülleri</p>
          <div className="flex gap-8">
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Bartın / Türkiye</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
