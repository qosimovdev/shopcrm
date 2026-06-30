import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Package, MapPin, Phone, Mail, Clock, CheckCircle, XCircle } from 'lucide-react';

const Profile = () => {
  const { currentUser, orders, logout } = useContext(AppContext);

  if (!currentUser) return null;

  // Filter orders for the current user
  const userOrders = orders.filter(o => o.userId === currentUser.id);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return '#22c55e';
      case 'Cancelled': return '#ef4444';
      default: return '#eab308'; // Pending
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle size={16} />;
      case 'Cancelled': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="section-container" style={{ paddingTop: 120, minHeight: '80vh' }}>
      <div className="section-heading">
        <h2>My Profile</h2>
        <button onClick={logout} className="btn outline-btn" style={{ borderColor: '#ef4444', color: '#ef4444' }}>
          Logout
        </button>
      </div>

      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* User Info Card */}
        <div className="glass" style={{ flex: '1 1 300px', padding: 30, borderRadius: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 30 }}>
            <img src={currentUser.avatar} alt="avatar" style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: 5 }}>{currentUser.name}</h3>
              <span style={{ 
                padding: '4px 10px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600,
                background: currentUser.role === 'superadmin' ? 'rgba(212, 175, 55, 0.2)' : currentUser.role === 'admin' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.1)',
                color: currentUser.role === 'superadmin' ? '#d4af37' : currentUser.role === 'admin' ? '#3b82f6' : 'var(--text-muted)'
              }}>
                {currentUser.role.toUpperCase()}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15, color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Mail size={18} /> {currentUser.email}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Clock size={18} /> Joined: {new Date(currentUser.joinedAt).toLocaleDateString()}</div>
          </div>
        </div>

        {/* Order History */}
        <div className="glass" style={{ flex: '2 1 600px', padding: 30, borderRadius: 16 }}>
          <h3 style={{ marginBottom: 20, fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Package /> Order History ({userOrders.length})
          </h3>
          
          {userOrders.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
              <Package size={48} style={{ opacity: 0.2, marginBottom: 15 }} />
              <p>You haven't placed any orders yet.</p>
              <a href="/products" className="btn primary-btn" style={{ marginTop: 20 }}>Start Shopping</a>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {userOrders.map(order => (
                <div key={order.id} style={{ 
                  padding: 20, borderRadius: 12, border: '1px solid var(--glass-border)',
                  background: 'rgba(255,255,255,0.02)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15, paddingBottom: 15, borderBottom: '1px solid var(--glass-border)' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 5 }}>{order.id}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(order.date).toLocaleString()}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', 
                        borderRadius: 20, fontSize: '0.85rem', fontWeight: 600,
                        color: getStatusColor(order.status), background: `${getStatusColor(order.status)}15`
                      }}>
                        {getStatusIcon(order.status)} {order.status}
                      </div>
                      <div style={{ marginTop: 8, fontWeight: 800, fontSize: '1.2rem' }}>
                        ${order.totalAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 15, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><MapPin size={16} /> {order.address}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Phone size={16} /> {order.phone}</div>
                  </div>

                  <div>
                    <strong style={{ fontSize: '0.9rem' }}>Items:</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
                      {order.items.map(item => (
                        <div key={item.id} style={{ 
                          display: 'flex', alignItems: 'center', gap: 10, padding: 10, 
                          borderRadius: 8, background: 'var(--bg-color)', border: '1px solid var(--glass-border)'
                        }}>
                          <img src={item.image} alt={item.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} />
                          <div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.quantity} x ${item.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
