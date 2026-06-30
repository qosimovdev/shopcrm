import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <div className="footer-logo">Watch<span>Shop</span></div>
        <p>Discover premium timepieces for every moment.</p>
      </div>
      <div className="footer-links">
        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/">New Arrivals</Link>
          <Link to="/products">All Watches</Link>
          <a href="#">Sale</a>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <a href="#">FAQ</a>
          <a href="#">Returns</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer-col">
          <h4>Admin</h4>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/add-product">Add Watch</Link>
          <Link to="/admin/categories">Categories</Link>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} WatchShop. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
