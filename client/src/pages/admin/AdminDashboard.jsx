import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import { ShoppingBag, Tag, Star, TrendingUp, Users } from 'lucide-react';
import './AdminLayout.css';

const CountUp = ({ end, prefix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1500;
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // use ease out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end]);

  return <>{prefix}{count.toLocaleString()}</>;
};

const AdminDashboard = () => {
  const { products, categories, users, cartItems } = useContext(AppContext);

  const newProducts = products.filter(p => p.isNew).length;
  const totalRevenue = products.reduce((acc, p) => acc + p.price, 0);

  const stats = [
    { icon: '⌚', label: 'Total Watches', value: products.length },
    { icon: '🏷️', label: 'Categories', value: categories.length },
    { icon: '⭐', label: 'New Arrivals', value: newProducts },
    { icon: '💰', label: 'Total Value', value: totalRevenue, prefix: '$' },
  ];

  return (
    <div>
      <h1 className="admin-page-title">
        Dashboard <span>Overview</span>
      </h1>

      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">
              <CountUp end={s.value} prefix={s.prefix} />
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h2 style={{ marginBottom: 20, fontSize: '1.1rem' }}>Recent Watches</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(-5).reverse().map(p => (
              <tr key={p.id}>
                <td><img className="table-img" src={p.image} alt={p.name} /></td>
                <td style={{ fontWeight: 600 }}>{p.name}</td>
                <td style={{ color: '#9ca3af' }}>{p.category}</td>
                <td style={{ color: '#d4af37', fontWeight: 700 }}>${p.price.toLocaleString()}</td>
                <td>
                  {p.isNew && <span className="badge-pill badge-new">New</span>}
                  {p.oldPrice && <span className="badge-pill badge-sale" style={{ marginLeft: 6 }}>Sale</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
