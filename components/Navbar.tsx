
import React from 'react';
import { Link } from 'react-router-dom';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, cartCount }) => {
  return (
    <nav className="bg-[#fdfcf0]/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex flex-col leading-none group">
              <span className="text-3xl font-black text-amber-900 tracking-tighter group-hover:text-amber-700 transition-colors">MİS</span>
              <span className="text-[10px] font-bold text-amber-600 tracking-[0.25em] uppercase">UNLU MAMÜLLERİ</span>
            </Link>
            <div className="hidden lg:ml-12 lg:flex lg:space-x-8">
              <Link to="/" className="text-amber-900/70 hover:text-amber-800 px-1 py-2 text-sm font-bold transition-all">Anasayfa</Link>
              <Link to="/urunler" className="text-amber-900/70 hover:text-amber-800 px-1 py-2 text-sm font-bold transition-all">Lezzetler</Link>
              <Link to="/iletisim" className="text-amber-900/70 hover:text-amber-800 px-1 py-2 text-sm font-bold transition-all">İletişim</Link>
              {(user?.role === UserRole.ADMIN || user?.role === UserRole.EDITOR) && (
                <Link to="/admin" className="text-white bg-amber-800 px-4 py-2 rounded-full text-xs font-black shadow-lg shadow-amber-200">PANEL</Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/sepet" className="relative group p-2 bg-white rounded-full shadow-sm border border-orange-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-800 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full ring-2 ring-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black text-amber-900">{user.fullName}</p>
                </div>
                <button onClick={onLogout} className="text-amber-800 hover:bg-orange-100 p-2 rounded-full transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-amber-800 text-white px-6 py-2.5 rounded-full text-sm font-black hover:bg-amber-900 shadow-md transition-all active:scale-95">Giriş</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
