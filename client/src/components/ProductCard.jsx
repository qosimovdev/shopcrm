import React, { useContext, useState } from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { AppContext } from '../App';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const { wishlist, toggleWishlist } = useContext(AppContext);
  const [added, setAdded] = useState(false);
  const isLiked = wishlist.includes(product.id);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card glass">
      <div className="img-wrap">
        <img src={product.image} alt={product.name} />
        {product.isNew && <span className="badge new-badge">NEW</span>}
        {product.oldPrice && <span className="badge sale-badge">SALE</span>}
        <button
          className={`wishlist-btn ${isLiked ? 'liked' : ''}`}
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="card-info">
        <span className="brand">{product.brand}</span>
        <h3>{product.name}</h3>
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={13}
              fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'}
              color={i < Math.floor(product.rating) ? '#fbbf24' : '#555'}
            />
          ))}
          <span className="review-count">({product.reviews})</span>
        </div>
        <div className="price-row">
          <div className="prices">
            <span className="price">${product.price}</span>
            {product.oldPrice && <span className="old-price">${product.oldPrice}</span>}
          </div>
          <button className={`add-btn ${added ? 'added' : ''}`} onClick={handleAdd}>
            {added ? '✓' : <ShoppingCart size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
