import React, { useContext } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../App';
import AdminDashboard from './AdminDashboard';
import AdminProducts from './AdminProducts';
import AdminCategories from './AdminCategories';
import AdminAddProduct from './AdminAddProduct';
import AdminUsers from './AdminUsers';
import AdminOrders from './AdminOrders';
import './AdminLayout.css';
import { LayoutDashboard, ShoppingBag, Tag, PlusCircle, ChevronRight, Store, Users, Crown, ClipboardList } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const { currentUser, logout, isSuperAdmin } = useContext(AppContext);

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Products', icon: ShoppingBag },
    { path: '/admin/add-product', label: 'Add Product', icon: PlusCircle },
    { path: '/admin/categories', label: 'Categories', icon: Tag },
    { path: '/admin/users', label: 'Users', icon: Users },
  ];

  if (isSuperAdmin) {
    navItems.push({ path: '/admin/orders', label: 'Orders', icon: ClipboardList });
  }

  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span className="logo-icon">⌚</span>
          <span>Watch<span>Shop</span></span>
        </div>

        {currentUser && (
          <div className="admin-user-info">
            <img src={currentUser.avatar} alt={currentUser.name} className="admin-avatar" />
            <div>
              <div className="admin-user-name">{currentUser.name}</div>
              <div className="admin-user-role">
                {isSuperAdmin ? '👑 Super Admin' : '🔧 Administrator'}
              </div>
            </div>
          </div>
        )}

        <nav className="admin-nav">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`admin-nav-item ${location.pathname === path ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{label}</span>
              <ChevronRight size={14} className="chevron" />
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <Link to="/" className="back-to-store">
            <Store size={16} /> View Store
          </Link>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </aside>

      <main className="admin-main">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="add-product" element={<AdminAddProduct />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="users" element={<AdminUsers />} />
          {isSuperAdmin && <Route path="orders" element={<AdminOrders />} />}
        </Routes>
      </main>
    </div>
  );
};

export default AdminLayout;
