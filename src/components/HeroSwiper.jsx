import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { AppContext } from '../App';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import './HeroSwiper.css';

const slides = [
  {
    tag: 'New Collection 2025',
    title: 'Time Is Luxury',
    subtitle: 'Discover world-class timepieces crafted with precision and elegance. Every second counts.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80',
    accent: '#d4af37',
  },
  {
    tag: 'Limited Edition',
    title: 'Elegance On Your Wrist',
    subtitle: 'Classic designs reimagined with premium materials and meticulous craftsmanship.',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80',
    accent: '#a855f7',
  },
  {
    tag: 'Smart Series',
    title: 'Future On Your Wrist',
    subtitle: 'Next-gen smartwatches with cutting-edge technology for the modern lifestyle.',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=80',
    accent: '#00f0ff',
  },
];

const HeroSwiper = () => {
  return (
    <section className="hero-swiper-section">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="hero-swiper"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="hero-slide">
              <div className="slide-content">
                <span className="slide-tag" style={{ color: slide.accent, borderColor: `${slide.accent}40` }}>
                  {slide.tag}
                </span>
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-subtitle">{slide.subtitle}</p>
                <div className="slide-actions">
                  <a href="#products" className="hero-btn" style={{ background: slide.accent, color: '#000' }}>
                    <ShoppingBag size={18} /> Shop Now
                  </a>
                  <a href="#products" className="hero-btn-ghost">
                    Explore All <ArrowRight size={18} />
                  </a>
                </div>
              </div>
              <div className="slide-image-wrap">
                <div className="slide-glow" style={{ background: `radial-gradient(circle, ${slide.accent}30 0%, transparent 70%)` }} />
                <img src={slide.image} alt={slide.title} className="slide-shoe" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSwiper;
