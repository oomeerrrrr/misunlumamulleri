
import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductsProps {
  onAddToCart: (product: Product) => void;
}

const Products: React.FC<ProductsProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Hepsi');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem('mis_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      const initialProducts: Product[] = [
        { 
          id: '1', name: 'Artisan Köy Ekmeği', 
          description: '72 saat soğuk fermantasyon ile dinlendirilmiş, %100 ekşi mayalı tam buğday ekmeği.', 
          price: 65, category: 'Ekmekler', 
          imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=600',
          ingredients: 'Tam Buğday Unu, Su, Ekşi Maya, Kaya Tuzu',
          weight: '850g'
        },
        { 
          id: '2', name: 'Zeytinli Artisan Poğaça', 
          description: 'Ege zeytinleri ile harmanlanmış, sütlü yumuşak hamurdan pofuduk lezzet.', 
          price: 25, category: 'Unlu Mamüller', 
          imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
          ingredients: 'Buğday Unu, Süt, Zeytin, Tereyağı, Yumurta',
          weight: '110g'
        },
        { 
          id: '3', name: 'Çikolatalı Kadife Pasta', 
          description: 'Belçika çikolatalı ganaj ve taze frambuazların eşsiz uyumu.', 
          price: 550, category: 'Pastalar', 
          imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
          ingredients: 'Kakao, Callebaut Çikolata, Krema, Şeker, Un',
          weight: '1.2kg'
        },
        { 
          id: '4', name: 'Elmalı Çıtır Kurabiye', 
          description: 'Tarçınlı elma dolgusu ve pudra şekeri ile klasik bir kış lezzeti.', 
          price: 180, category: 'Kurabiyeler', 
          imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=600',
          ingredients: 'Elma, Tarçın, Tereyağı, Un, Pudra Şekeri',
          weight: '500g'
        },
        { 
          id: '6', name: 'Tahinli Çörek', 
          description: 'Susam ve yoğun tahin dolgulu, kat kat açılmış geleneksel çörek.', 
          price: 45, category: 'Unlu Mamüller', 
          imageUrl: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=600',
          ingredients: 'Tahin, Şeker, Un, Susam, Yağ',
          weight: '150g'
        }
      ];
      setProducts(initialProducts);
      localStorage.setItem('mis_products', JSON.stringify(initialProducts));
    }
  }, []);

  const categories = ['Hepsi', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'Hepsi' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#fdfcf0] min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-amber-700 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Fırından Şimdi Çıktı</span>
            <h1 className="text-5xl md:text-6xl font-black text-stone-900 tracking-tighter mb-4 leading-none">Vitrinimiz</h1>
            <p className="text-stone-500 text-lg font-medium leading-relaxed">
              Her sabah gün doğmadan hazırladığımız taptaze ürünlerimizle fırınımızın büyüsünü keşfedin.
            </p>
          </div>
          
          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-6">
            <div className="relative group">
              <input
                type="text"
                placeholder="Lezzet ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-72 pl-12 pr-6 py-4 bg-white border border-stone-100 rounded-[2rem] focus:ring-4 focus:ring-amber-500/10 outline-none transition-all shadow-sm"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-4 top-4 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-4 rounded-[2rem] text-sm font-black transition-all active:scale-95 ${
                    selectedCategory === cat 
                    ? 'bg-amber-800 text-white shadow-xl shadow-amber-900/20' 
                    : 'bg-white border border-stone-100 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-stone-200">
            <p className="text-stone-400 font-bold text-xl">Aradığınız lezzet bugün fırınımızda yok gibi görünüyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-white rounded-[3rem] shadow-sm border border-stone-50 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col group"
              >
                <div 
                  className="relative h-72 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-amber-900/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-amber-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-black uppercase tracking-[0.3em] bg-amber-800/80 px-6 py-3 rounded-full">Detayları Gör</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black text-stone-900 leading-none">{product.name}</h3>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-md">{product.weight}</span>
                  </div>
                  <p className="text-stone-500 text-sm mb-8 flex-grow leading-relaxed line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-3xl font-black text-amber-900">{product.price.toLocaleString('tr-TR')} ₺</span>
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="bg-amber-800 text-white p-4 rounded-2xl hover:bg-amber-900 transition-all active:scale-90 shadow-lg shadow-amber-900/10"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-[100] bg-stone-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#fdfcf0] rounded-[3rem] max-w-4xl w-full overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto relative">
                <img src={selectedProduct.imageUrl} className="w-full h-full object-cover" alt={selectedProduct.name} />
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 left-6 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-8 md:p-12 flex flex-col">
                <div className="mb-10">
                  <span className="text-amber-800 font-black text-[10px] uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">{selectedProduct.category}</span>
                  <h2 className="text-4xl font-black text-stone-900 mt-4 mb-2 tracking-tighter">{selectedProduct.name}</h2>
                  <p className="text-stone-500 leading-relaxed text-lg">{selectedProduct.description}</p>
                </div>
                
                <div className="space-y-6 mb-12">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-amber-800">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-stone-400 uppercase tracking-widest">Ağırlık</h4>
                      <p className="font-bold text-stone-800">{selectedProduct.weight || 'Bilgi yok'}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-amber-800">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-stone-400 uppercase tracking-widest">İçindekiler</h4>
                      <p className="font-bold text-stone-800 text-sm">{selectedProduct.ingredients || 'Doğal malzemeler'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-stone-200 pt-8">
                  <span className="text-4xl font-black text-amber-900">{selectedProduct.price} ₺</span>
                  <button 
                    onClick={() => { onAddToCart(selectedProduct); setSelectedProduct(null); }}
                    className="bg-amber-800 text-white px-10 py-5 rounded-[2rem] font-black hover:bg-amber-900 transition shadow-xl shadow-amber-900/20 active:scale-95"
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
