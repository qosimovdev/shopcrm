import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const { t, cartItems, addOrder, clearCart, currentUser, setAuthModal } = useContext(AppContext);
  const navigate = useNavigate();
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const [form, setForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    cardNumber: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      setAuthModal('login');
      return;
    }

    if (cartItems.length === 0) return;

    // Create order
    const orderData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      items: cartItems,
      totalAmount: total,
    };

    addOrder(orderData);
    clearCart();
    navigate('/profile');
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container glass">
        <h2>{t.checkout}</h2>
        <div className="checkout-grid">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>Shipping Details</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={form.name} 
                onChange={e => setForm({...form, name: e.target.value})} 
                placeholder="John Doe" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={form.email} 
                onChange={e => setForm({...form, email: e.target.value})} 
                placeholder="john@example.com" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                value={form.phone} 
                onChange={e => setForm({...form, phone: e.target.value})} 
                placeholder="+998 90 123 45 67" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Delivery Address</label>
              <input 
                type="text" 
                value={form.address} 
                onChange={e => setForm({...form, address: e.target.value})} 
                placeholder="Tashkent, Yunusabad 13" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Card Details (Mock)</label>
              <input 
                type="text" 
                value={form.cardNumber}
                onChange={e => setForm({...form, cardNumber: e.target.value})}
                placeholder="8600 XXXX XXXX XXXX" 
                required 
              />
            </div>
            <button type="submit" className="btn primary-btn" disabled={cartItems.length === 0}>
              Pay ${total.toLocaleString()}
            </button>
          </form>
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cartItems.length === 0 ? (
              <p style={{ color: '#9ca3af' }}>Your cart is empty.</p>
            ) : (
              <div className="summary-items">
                {cartItems.map(item => (
                  <div key={item.id} className="summary-item">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="summary-total">
              <strong>{t.total}</strong>
              <strong>${total.toLocaleString()}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
