import React, { useState, useEffect, useContext } from 'react';
import { ShoppingBag, Search, Menu, Heart, Sun, Moon, Globe, X, Settings, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import './Navbar.css';

const Navbar = ({ cartCount, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { t, theme, setTheme, lang, setLang, wishlist, searchQuery, setSearchQuery, currentUser, setAuthModal, logout, isAdmin } = useContext(AppContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <button className="icon-btn mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" className="logo">Watch<span>Shop</span></Link>

        <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          <li><Link to="/" onClick={() => setMobileOpen(false)}>{t.newArrivals}</Link></li>
          <li><Link to="/products" onClick={() => setMobileOpen(false)}>Products</Link></li>
          {isAdmin && (
            <li><Link to="/admin" onClick={() => setMobileOpen(false)} style={{ color: '#d4af37' }}><Settings size={14} /> Admin</Link></li>
          )}
        </ul>

        <div className="nav-actions">
          {showSearch && (
            <input
              type="text"
              className="search-input"
              placeholder={t.search}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoFocus
              onBlur={() => { if (!searchQuery) setShowSearch(false); }}
            />
          )}
          <button className="icon-btn" onClick={() => setShowSearch(!showSearch)}><Search size={20} /></button>
          <button className="icon-btn" onClick={() => setLang(lang === 'en' ? 'uz' : 'en')}>
            <Globe size={18} /><span className="lang-text">{lang.toUpperCase()}</span>
          </button>
          <button className="icon-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="icon-btn cart-btn">
            <Heart size={20} />
            {wishlist.length > 0 && <span className="cart-badge">{wishlist.length}</span>}
          </button>
          <button className="icon-btn cart-btn" onClick={onOpenCart}>
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {currentUser ? (
            <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'inherit' }}>
                <img src={currentUser.avatar} alt="" className="nav-avatar" />
                <span className="nav-user-name">{currentUser.name.split(' ')[0]}</span>
              </Link>
              <button className="icon-btn" onClick={logout} title="Logout"><LogOut size={16} /></button>
            </div>
          ) : (
            <button className="login-btn" onClick={() => setAuthModal('login')}>
              <User size={16} /> Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
