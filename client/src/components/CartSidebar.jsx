import React, { useContext } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import './CartSidebar.css';

const CartSidebar = ({ isOpen, onClose, cartItems, onRemove }) => {
  const { t } = useContext(AppContext);
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`cart-sidebar glass ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>{t.cart}</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart">{t.emptyCart}</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">${item.price} x {item.quantity}</p>
                </div>
                <button className="remove-btn" onClick={() => onRemove(item.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>{t.total}</span>
            <span>${total}</span>
          </div>
          <Link to="/checkout" onClick={onClose} className="btn primary-btn checkout-btn">
            {t.checkout}
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
