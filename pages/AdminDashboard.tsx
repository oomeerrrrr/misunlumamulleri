
import React, { useState, useEffect } from 'react';
import { User, Product, UserRole, Order, OrderStatus } from '../types';

interface AdminDashboardProps {
  user: User;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, orders, setOrders }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('orders');
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
    ingredients: '',
    weight: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('mis_products');
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p);
    } else {
      updatedProducts = [...products, { ...formData, id: Math.random().toString(36).substr(2, 9) }];
    }
    setProducts(updatedProducts);
    localStorage.setItem('mis_products', JSON.stringify(updatedProducts));
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: 0, category: '', imageUrl: '', ingredients: '', weight: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#fdfcf0] min-h-screen">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-stone-900 tracking-tighter">Fırın Yönetimi</h1>
          <p className="text-stone-500 font-bold uppercase text-[10px] tracking-widest mt-2">Hoş geldin, {user.fullName}</p>
        </div>
        <div className="bg-stone-200/50 p-2 rounded-[2rem] flex gap-2">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-8 py-3 rounded-[1.5rem] text-sm font-black transition ${activeTab === 'orders' ? 'bg-amber-800 text-white shadow-lg' : 'text-stone-500 hover:text-stone-700'}`}
          >
            Sipariş Takibi ({orders.length})
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-8 py-3 rounded-[1.5rem] text-sm font-black transition ${activeTab === 'products' ? 'bg-amber-800 text-white shadow-lg' : 'text-stone-500 hover:text-stone-700'}`}
          >
            Katalog Yönetimi
          </button>
        </div>
      </div>

      {activeTab === 'orders' ? (
        <div className="grid grid-cols-1 gap-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white border border-stone-100 rounded-[2.5rem] p-8 shadow-sm">
              <div className="flex flex-wrap justify-between items-start gap-6 mb-8">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-800 font-black text-xl">
                    {order.orderNumber.slice(-2)}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-stone-900">{order.customerName}</h3>
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">{order.orderNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-amber-900">{order.total} ₺</p>
                  <p className="text-xs font-bold text-amber-700 uppercase">{order.paymentMethod}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-stone-50 rounded-3xl p-6">
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">Teslimat Adresi</p>
                  <p className="text-stone-700 text-sm font-medium leading-relaxed">{order.address}</p>
                </div>
                <div className="bg-stone-50 rounded-3xl p-6">
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">Sipariş İçeriği</p>
                  <div className="flex flex-wrap gap-2">
                    {order.items.map(item => (
                      <span key={item.id} className="bg-white px-3 py-1 rounded-lg text-xs font-black text-stone-600 border border-stone-100">
                        {item.quantity}x {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full animate-pulse ${
                    order.status === OrderStatus.PENDING ? 'bg-amber-500' : 
                    order.status === OrderStatus.DELIVERED ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                  <span className="text-sm font-black text-stone-800 uppercase tracking-widest">{order.status}</span>
                </div>
                <select 
                  onChange={(e) => {
                    const updated = orders.map(o => o.id === order.id ? { ...o, status: e.target.value as OrderStatus } : o);
                    setOrders(updated);
                    localStorage.setItem('mis_orders', JSON.stringify(updated));
                  }}
                  className="bg-stone-900 text-white rounded-2xl text-xs font-black px-6 py-3 outline-none focus:ring-4 focus:ring-amber-500/50 appearance-none cursor-pointer"
                  value={order.status}
                >
                  {Object.values(OrderStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] p-10 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black">Ürün Kataloğu</h2>
            <button onClick={() => setIsModalOpen(true)} className="bg-amber-800 text-white px-8 py-4 rounded-2xl font-black hover:bg-amber-900 transition shadow-lg">Yeni Ürün</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="py-6 text-left text-[10px] font-black text-stone-400 uppercase tracking-widest">Görsel</th>
                <th className="py-6 text-left text-[10px] font-black text-stone-400 uppercase tracking-widest">Lezzet</th>
                <th className="py-6 text-left text-[10px] font-black text-stone-400 uppercase tracking-widest">Fiyat</th>
                <th className="py-6 text-right text-[10px] font-black text-stone-400 uppercase tracking-widest">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {products.map(p => (
                <tr key={p.id}>
                  <td className="py-6"><img src={p.imageUrl} className="w-16 h-16 rounded-2xl object-cover shadow-sm" /></td>
                  <td className="py-6 font-black text-stone-900">{p.name}<br/><span className="text-[10px] text-stone-400 font-bold uppercase">{p.category}</span></td>
                  <td className="py-6 font-black text-amber-900">{p.price} ₺</td>
                  <td className="py-6 text-right">
                    <button onClick={() => { 
                      setEditingProduct(p); 
                      setFormData({
                        name: p.name,
                        description: p.description,
                        price: p.price,
                        category: p.category,
                        imageUrl: p.imageUrl,
                        ingredients: p.ingredients || '',
                        weight: p.weight || ''
                      }); 
                      setIsModalOpen(true); 
                    }} className="text-amber-700 font-black text-sm mr-6 hover:underline">Düzenle</button>
                    <button onClick={() => { if(confirm('Sil?')) { const u = products.filter(x => x.id !== p.id); setProducts(u); localStorage.setItem('mis_products', JSON.stringify(u)); }}} className="text-red-500 font-black text-sm hover:underline">Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[110] bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] max-w-2xl w-full p-10 animate-in zoom-in duration-300">
            <h3 className="text-3xl font-black mb-8">{editingProduct ? 'Lezzeti Güncelle' : 'Yeni Lezzet Ekle'}</h3>
            <form onSubmit={handleSaveProduct} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input required placeholder="Ürün Adı" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-stone-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500" />
                <input required placeholder="Kategori" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-stone-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <input required type="number" placeholder="Fiyat" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full bg-stone-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500" />
                <input placeholder="Gramaj (Örn: 400g)" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} className="w-full bg-stone-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500" />
              </div>
              <textarea required placeholder="Açıklama" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-stone-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 h-24" />
              <input placeholder="İçindekiler" value={formData.ingredients} onChange={e => setFormData({...formData, ingredients: e.target.value})} className="w-full bg-stone-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500" />
              <input required placeholder="Görsel URL (Unsplash önerilir)" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-stone-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500" />
              <div className="flex gap-4 pt-6">
                <button type="button" onClick={closeModal} className="flex-grow bg-stone-100 py-4 rounded-2xl font-black text-stone-500">İptal</button>
                <button type="submit" className="flex-grow bg-amber-800 py-4 rounded-2xl font-black text-white">Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
