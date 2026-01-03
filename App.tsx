
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import { User, UserRole, CartItem, Product, Order } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('mis_user');
    const savedCart = localStorage.getItem('mis_cart');
    const savedOrders = localStorage.getItem('mis_orders');
    
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem('mis_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mis_orders', JSON.stringify(orders));
  }, [orders]);

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('mis_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('mis_user');
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    clearCart();
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar user={currentUser} onLogout={logout} cartCount={cart.reduce((a, b) => a + b.quantity, 0)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/urunler" element={<Products onAddToCart={addToCart} />} />
            <Route path="/sepet" element={<Cart cart={cart} updateQuantity={updateCartQuantity} onAddOrder={addOrder} />} />
            <Route path="/iletisim" element={<Contact />} />
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/admin/*" 
              element={
                currentUser && (currentUser.role === UserRole.ADMIN || currentUser.role === UserRole.EDITOR) ? (
                  <AdminDashboard user={currentUser} orders={orders} setOrders={setOrders} />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
