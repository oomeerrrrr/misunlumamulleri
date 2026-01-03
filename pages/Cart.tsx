
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartItem, Order, OrderStatus } from '../types';

interface CartProps {
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  onAddOrder: (order: Order) => void;
}

const Cart: React.FC<CartProps> = ({ cart, updateQuantity, onAddOrder }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentOrderNumber, setCurrentOrderNumber] = useState('');
  
  const [customerData, setCustomerData] = useState({
    fullName: '',
    address: '',
    paymentMethod: 'Nakit' as 'Nakit' | 'Kart'
  });

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNum = 'MIS-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      orderNumber: orderNum,
      items: [...cart],
      total,
      customerName: customerData.fullName,
      address: customerData.address,
      paymentMethod: customerData.paymentMethod,
      status: OrderStatus.PENDING,
      createdAt: new Date().toLocaleString('tr-TR')
    };
    
    setCurrentOrderNumber(orderNum);
    onAddOrder(newOrder);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center animate-in fade-in zoom-in duration-300">
        <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-black text-gray-900 mb-4">Siparişiniz Alındı!</h2>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
          <p className="text-sm text-gray-400 uppercase font-bold tracking-widest mb-1">Sipariş Numarası</p>
          <p className="text-2xl font-black text-amber-700">{currentOrderNumber}</p>
        </div>
        <p className="text-gray-600 mb-2 font-medium">En yakın sürede siparişinizi size ulaştıracağız.</p>
        <p className="text-gray-500 mb-10 text-sm">Siparişiniz hakkında detaylar için bu numaradan aranabilirsiniz veya bize hemen ulaşabilirsiniz:</p>
        
        <div className="space-y-4">
          <a 
            href="tel:05308482429" 
            className="flex items-center justify-center gap-3 w-full bg-amber-600 text-white py-4 rounded-2xl font-black hover:bg-amber-700 transition shadow-lg shadow-amber-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            0530 848 2429 (Tıkla Ara)
          </a>
          <Link to="/urunler" className="block text-amber-700 font-bold hover:underline">Alışverişe Devam Et</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="bg-amber-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Sepetiniz Boş</h2>
        <p className="text-gray-500 mb-8">Henüz sepetinize bir lezzet eklemediniz.</p>
        <Link to="/urunler" className="inline-block bg-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-700 transition shadow-lg shadow-amber-200">
          Ürünlere Göz At
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-10">{isCheckout ? 'Sipariş Bilgileri' : 'Sepetim'}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {!isCheckout ? (
            <>
              {cart.map(item => (
                <div key={item.id} className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center gap-6 shadow-sm">
                  <img src={item.imageUrl} className="w-24 h-24 object-cover rounded-xl" />
                  <div className="flex-grow">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{item.category}</p>
                    <p className="text-amber-700 font-black mt-1">{item.price} ₺</p>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-amber-600"
                    >-</button>
                    <span className="font-bold w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-amber-600"
                    >+</button>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <p className="font-black text-gray-900">{(item.price * item.quantity).toLocaleString()} ₺</p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4">
                <Link to="/urunler" className="text-sm font-bold text-gray-500 hover:text-amber-600 transition">← Alışverişe Devam Et</Link>
              </div>
            </>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <form id="checkout-form" onSubmit={handleOrder} className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2">Ad Soyad</label>
                  <input 
                    type="text" 
                    required
                    value={customerData.fullName}
                    onChange={e => setCustomerData({...customerData, fullName: e.target.value})}
                    placeholder="Lütfen adınızı ve soyadınızı giriniz"
                    className="w-full bg-stone-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2">Teslimat Adresi</label>
                  <textarea 
                    required
                    rows={4}
                    value={customerData.address}
                    onChange={e => setCustomerData({...customerData, address: e.target.value})}
                    placeholder="Açık adresinizi buraya yazınız..."
                    className="w-full bg-stone-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-4">Ödeme Yöntemi</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setCustomerData({...customerData, paymentMethod: 'Nakit'})}
                      className={`p-4 rounded-2xl border-2 font-bold transition-all flex items-center justify-center gap-2 ${
                        customerData.paymentMethod === 'Nakit' ? 'border-amber-600 bg-amber-50 text-amber-700' : 'border-stone-100 bg-stone-50 text-stone-500'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                      </svg>
                      Nakit
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomerData({...customerData, paymentMethod: 'Kart'})}
                      className={`p-4 rounded-2xl border-2 font-bold transition-all flex items-center justify-center gap-2 ${
                        customerData.paymentMethod === 'Kart' ? 'border-amber-600 bg-amber-50 text-amber-700' : 'border-stone-100 bg-stone-50 text-stone-500'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                      </svg>
                      Kapıda Kart
                    </button>
                  </div>
                </div>
              </form>
              <button 
                onClick={() => setIsCheckout(false)}
                className="text-sm font-bold text-stone-400 hover:text-stone-600 transition"
              >
                ← Sepete Dön
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-stone-100 p-8 rounded-3xl shadow-xl sticky top-28">
            <h2 className="text-xl font-bold mb-6 text-stone-900">Sipariş Özeti</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-stone-500">
                <span>Ara Toplam</span>
                <span>{total.toLocaleString()} ₺</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Teslimat Ücreti</span>
                <span className="text-green-600 font-bold uppercase text-xs">Ücretsiz</span>
              </div>
              <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
                <span className="font-bold text-stone-900">Toplam</span>
                <span className="text-2xl font-black text-amber-700">{total.toLocaleString()} ₺</span>
              </div>
            </div>
            {!isCheckout ? (
              <button 
                onClick={() => setIsCheckout(true)}
                className="w-full bg-amber-600 text-white py-4 rounded-2xl font-black hover:bg-amber-700 transition shadow-lg shadow-amber-200"
              >
                Sipariş Bilgilerini Gir
              </button>
            ) : (
              <div className="space-y-4">
                <button 
                  onClick={() => {
                    alert('Online ödeme sistemi yakında aktif olacaktır. Şimdilik siparişlerinizi kapıda nakit veya kart ile ödeyebilir, detaylar için 0530 848 2429 numaralı telefondan bize ulaşabilirsiniz.');
                  }}
                  className="w-full bg-stone-100 text-stone-500 py-4 rounded-2xl font-black hover:bg-stone-200 transition"
                >
                  Online Ödeme (Yakında)
                </button>
                <button 
                  form="checkout-form"
                  type="submit"
                  className="w-full bg-green-600 text-white py-4 rounded-2xl font-black hover:bg-green-700 transition shadow-lg shadow-green-100"
                >
                  Siparişi Tamamla
                </button>
              </div>
            )}
            <div className="mt-6 p-4 bg-stone-50 rounded-xl border border-stone-100">
              <p className="text-[11px] text-stone-400 leading-relaxed text-center">
                Siparişinizi onayladıktan sonra Bartın içi teslimat bölgelerimize göre ortalama 45 dakika içerisinde adresinize ulaştırılacaktır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
