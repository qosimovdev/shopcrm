import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import ProductsPage from './pages/ProductsPage';
import AdminLayout from './pages/admin/AdminLayout';
import AuthModal from './components/AuthModal';
import Profile from './pages/Profile';
import { translations } from './i18n';

export const AppContext = createContext();

const initialProducts = [
  { id: 1, name: 'Royal Chronograph', price: 1299, oldPrice: 1599, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=600&q=80', category: 'Luxury', brand: 'Omega', isNew: true, rating: 4.8, reviews: 128 },
  { id: 2, name: 'G-Shock Mudmaster', price: 349, oldPrice: null, image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=600&q=80', category: 'Sport', brand: 'Casio', isNew: false, rating: 4.6, reviews: 85 },
  { id: 3, name: 'Heritage Classic', price: 899, oldPrice: 1050, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80', category: 'Classic', brand: 'Tissot', isNew: false, rating: 4.5, reviews: 200 },
  { id: 4, name: 'Galaxy Watch Ultra', price: 649, oldPrice: null, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80', category: 'Smart', brand: 'Samsung', isNew: true, rating: 4.7, reviews: 64 },
  { id: 5, name: 'Seamaster Diver 300', price: 5299, oldPrice: 5999, image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=600&q=80', category: 'Luxury', brand: 'Omega', isNew: true, rating: 4.9, reviews: 310 },
  { id: 6, name: 'Presage Cocktail', price: 445, oldPrice: 520, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=80', category: 'Classic', brand: 'Seiko', isNew: false, rating: 4.4, reviews: 92 },
  { id: 7, name: 'Apple Watch Series 9', price: 399, oldPrice: null, image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=600&q=80', category: 'Smart', brand: 'Apple', isNew: true, rating: 4.6, reviews: 47 },
  { id: 8, name: 'PRX Powermatic 80', price: 695, oldPrice: 795, image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=600&q=80', category: 'Classic', brand: 'Tissot', isNew: false, rating: 4.3, reviews: 155 },
];

const initialCategories = [
  { id: 1, name: 'Luxury', icon: '💎', color: '#d4af37' },
  { id: 2, name: 'Sport', icon: '⚡', color: '#00f0ff' },
  { id: 3, name: 'Classic', icon: '🕰️', color: '#a855f7' },
  { id: 4, name: 'Smart', icon: '⌚', color: '#22c55e' },
];

const initialUsers = [
  { id: 1, name: 'Super Admin', email: 'super@gmail.com', password: 'super123', role: 'superadmin', avatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=d4af37&color=fff', joinedAt: '2024-01-01' },
  { id: 2, name: 'Admin User', email: 'admin@gmail.com', password: 'admin123', role: 'admin', avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff', joinedAt: '2024-03-15' },
  { id: 3, name: 'John Doe', email: 'john@example.com', password: 'john123', role: 'user', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random', joinedAt: '2024-06-15' },
  { id: 4, name: 'Sarah Kim', email: 'sarah@example.com', password: 'sarah123', role: 'user', avatar: 'https://ui-avatars.com/api/?name=Sarah+Kim&background=random', joinedAt: '2025-01-20' },
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('en');
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('ws_products_v2');
    return saved ? JSON.parse(saved) : initialProducts;
  });
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('ws_categories_v2');
    return saved ? JSON.parse(saved) : initialCategories;
  });
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('ws_users_v2');
    return saved ? JSON.parse(saved) : initialUsers;
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ws_currentUser_v2');
    return saved ? JSON.parse(saved) : null;
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('ws_orders_v2');
    return saved ? JSON.parse(saved) : [];
  });
  const [authModal, setAuthModal] = useState(null); // 'login' | 'register' | null

  const t = translations[lang];

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-mode' : '';
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('ws_users_v2', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('ws_currentUser_v2', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ws_orders_v2', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ws_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ws_categories_v2', JSON.stringify(categories));
  }, [categories]);

  // Auth actions
  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) { setCurrentUser(user); setAuthModal(null); return { success: true }; }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = (name, email, password) => {
    if (users.find(u => u.email === email)) return { success: false, error: 'Email already exists' };
    const newUser = {
      id: Date.now(), name, email, password, role: 'user',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      joinedAt: new Date().toISOString().slice(0, 10),
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setAuthModal(null);
    return { success: true };
  };

  const logout = () => setCurrentUser(null);

  // User management (superadmin only can toggle roles)
  const deleteUser = (id) => {
    if (currentUser?.id === id) return; // can't delete yourself
    // Regular admins can't delete superadmin
    const targetUser = users.find(u => u.id === id);
    if (targetUser?.role === 'superadmin') return;
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const toggleUserRole = (id) => {
    // Only superadmin can change roles
    if (currentUser?.role !== 'superadmin') return;
    // Can't change superadmin's own role
    const targetUser = users.find(u => u.id === id);
    if (targetUser?.role === 'superadmin') return;

    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, role: u.role === 'admin' ? 'user' : 'admin' } : u
    ));
  };

  // Product actions
  const addToCart = (product) => {
    if (!currentUser) return setAuthModal('login');
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => setCartItems(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setCartItems([]);
  
  const toggleWishlist = (id) => {
    if (!currentUser) return setAuthModal('login');
    setWishlist(prev => prev.includes(id) ? prev.filter(wId => wId !== id) : [...prev, id]);
  };
  const addProduct = (product) => setProducts(prev => [...prev, { ...product, id: Date.now(), isNew: true, rating: 5, reviews: 0 }]);
  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));
  const addCategory = (category) => setCategories(prev => [...prev, { ...category, id: Date.now() }]);
  const deleteCategory = (id) => setCategories(prev => prev.filter(c => c.id !== id));

  // Orders
  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      userId: currentUser.id,
      date: new Date().toISOString(),
      status: 'Pending',
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder.id;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'superadmin';
  const isSuperAdmin = currentUser?.role === 'superadmin';

  const contextValue = {
    t, theme, setTheme, lang, setLang,
    wishlist, toggleWishlist,
    searchQuery, setSearchQuery,
    cartItems, addToCart, removeFromCart, clearCart,
    products, addProduct, deleteProduct,
    categories, addCategory, deleteCategory,
    users, deleteUser, toggleUserRole,
    orders, addOrder, updateOrderStatus,
    currentUser, login, register, logout,
    authModal, setAuthModal,
    isAdmin, isSuperAdmin,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/admin/*" element={
              isAdmin
                ? <AdminLayout />
                : <Navigate to="/" replace />
            } />
            <Route path="*" element={
              <>
                <Navbar cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />
                <Routes>
                  <Route path="/" element={<Home onAddToCart={addToCart} />} />
                  <Route path="/products" element={<ProductsPage onAddToCart={addToCart} />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/" />} />
                </Routes>
                <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} onRemove={removeFromCart} />
              </>
            } />
          </Routes>
          {authModal && <AuthModal />}
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
