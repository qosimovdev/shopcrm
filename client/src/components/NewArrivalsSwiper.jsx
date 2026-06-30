import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { AppContext } from '../App';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import './NewArrivalsSwiper.css';

const NewArrivalsSwiper = ({ onAddToCart }) => {
  const { products, wishlist, toggleWishlist } = useContext(AppContext);
  const newProducts = products.filter(p => p.isNew);

  if (newProducts.length === 0) return null;

  return (
    <section className="new-arrivals-section section-container">
      <div className="section-heading">
        <h2>🔥 New Arrivals</h2>
        <a href="/products">View All</a>
      </div>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="arrivals-swiper"
      >
        {newProducts.map(product => {
          const isLiked = wishlist.includes(product.id);
          return (
            <SwiperSlide key={product.id}>
              <div className="arrival-card glass">
                <div className="arrival-img-wrap">
                  <img src={product.image} alt={product.name} />
                  <span className="arrival-badge">NEW</span>
                  <button
                    className={`arrival-heart ${isLiked ? 'liked' : ''}`}
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="arrival-info">
                  <span className="arrival-brand">{product.brand}</span>
                  <h3>{product.name}</h3>
                  <div className="arrival-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12}
                        fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'}
                        color={i < Math.floor(product.rating) ? '#fbbf24' : '#555'}
                      />
                    ))}
                    <span>({product.reviews})</span>
                  </div>
                  <div className="arrival-price-row">
                    <span className="arrival-price">${product.price.toLocaleString()}</span>
                    {product.oldPrice && <span className="arrival-old">${product.oldPrice.toLocaleString()}</span>}
                    <button className="arrival-add" onClick={() => onAddToCart(product)}>
                      <ShoppingCart size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default NewArrivalsSwiper;
