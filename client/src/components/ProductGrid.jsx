import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { ShoppingCart, Heart, Star, SlidersHorizontal } from 'lucide-react';
import './ProductGrid.css';

const ProductGrid = ({ onAddToCart }) => {
  const { products, wishlist, toggleWishlist, searchQuery, categories } = useContext(AppContext);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  const allCategories = ['All', ...categories.map(c => c.name)];

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (activeCategory !== 'All') {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <section id="products" className="products-section section-container">
      <div className="section-heading">
        <h2>All Products</h2>
        <a href="/products">View All</a>
      </div>

      <div className="products-toolbar">
        <div className="category-tabs">
          {allCategories.map(cat => (
            <button
              key={cat}
              className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="sort-wrap">
          <SlidersHorizontal size={16} />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-select">
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filtered.map(product => {
          const isLiked = wishlist.includes(product.id);
          return (
            <div key={product.id} className="p-card glass">
              <div className="p-img-wrap">
                <img src={product.image} alt={product.name} />
                <div className="p-badges">
                  {product.isNew && <span className="p-badge new">NEW</span>}
                  {product.oldPrice && <span className="p-badge sale">SALE</span>}
                </div>
                <button className={`p-heart ${isLiked ? 'liked' : ''}`} onClick={() => toggleWishlist(product.id)}>
                  <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="p-info">
                <span className="p-brand">{product.brand}</span>
                <h3>{product.name}</h3>
                <div className="p-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12}
                      fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'}
                      color={i < Math.floor(product.rating) ? '#fbbf24' : '#555'} />
                  ))}
                  <span>({product.reviews})</span>
                </div>
                <div className="p-price-row">
                  <div>
                    <span className="p-price">${product.price}</span>
                    {product.oldPrice && <span className="p-old">${product.oldPrice}</span>}
                  </div>
                  <button className="p-add-btn" onClick={() => onAddToCart(product)}>
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="no-results">
            <p>No products found {searchQuery ? `for "${searchQuery}"` : `in "${activeCategory}"`}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
