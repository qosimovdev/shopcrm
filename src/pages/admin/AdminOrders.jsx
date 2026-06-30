import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Package, MapPin, Phone, Mail, Clock } from 'lucide-react';
import './AdminLayout.css';

const AdminOrders = () => {
  const { orders, updateOrderStatus, users } = useContext(AppContext);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return '#22c55e';
      case 'Cancelled': return '#ef4444';
      default: return '#eab308'; // Pending
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">
        Orders <span>Global Order History</span>
      </h1>

      <div className="admin-card">
        <h2 style={{ marginBottom: 20, fontSize: '1.2rem' }}>All Orders ({orders.length})</h2>
        
        {orders.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>
            <Package size={48} style={{ opacity: 0.2, marginBottom: 15 }} />
            <p>No orders have been placed yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {orders.map(order => {
              const orderUser = users.find(u => u.id === order.userId);
              return (
                <div key={order.id} style={{ 
                  padding: 24, borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)'
                }}>
                  {/* Order Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 15, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 5 }}>{order.id}</div>
                      <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{new Date(order.date).toLocaleString()}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <select 
                        className="admin-input"
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        style={{ 
                          padding: '6px 12px', borderRadius: 20, fontSize: '0.85rem', fontWeight: 600,
                          color: getStatusColor(order.status), background: `${getStatusColor(order.status)}15`,
                          border: `1px solid ${getStatusColor(order.status)}40`, cursor: 'pointer', outline: 'none'
                        }}
                      >
                        <option value="Pending" style={{ color: '#000' }}>Pending</option>
                        <option value="Delivered" style={{ color: '#000' }}>Delivered</option>
                        <option value="Cancelled" style={{ color: '#000' }}>Cancelled</option>
                      </select>
                      <div style={{ marginTop: 10, fontWeight: 800, fontSize: '1.3rem', color: '#d4af37' }}>
                        ${order.totalAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
                    {/* Customer Details */}
                    <div style={{ flex: 1, minWidth: 300 }}>
                      <h4 style={{ marginBottom: 12, color: '#fff', fontSize: '0.95rem' }}>Customer Details</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.9rem', color: '#d1d5db' }}>
                        <div><strong>Account:</strong> {orderUser?.name || 'Unknown'} (Role: {orderUser?.role || 'N/A'})</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><User size={16} /> <strong>Name:</strong> {order.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Phone size={16} /> <strong>Phone:</strong> {order.phone}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Mail size={16} /> <strong>Email:</strong> {order.email}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><MapPin size={16} /> <strong>Address:</strong> {order.address}</div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div style={{ flex: 1, minWidth: 300 }}>
                      <h4 style={{ marginBottom: 12, color: '#fff', fontSize: '0.95rem' }}>Purchased Items</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {order.items.map(item => (
                          <div key={item.id} style={{ 
                            display: 'flex', alignItems: 'center', gap: 12, padding: 10, 
                            borderRadius: 8, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)'
                          }}>
                            <img src={item.image} alt={item.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} />
                            <div>
                              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.name}</div>
                              <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{item.quantity} x ${item.price.toLocaleString()}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// Simple User icon fallback since it wasn't imported from lucide-react at the top
const User = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default AdminOrders;
