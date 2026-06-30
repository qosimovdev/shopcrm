import React, { useContext } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { AppContext } from '../App';
import './Hero.css';

const Hero = () => {
  const { t } = useContext(AppContext);

  return (
    <section className="hero">
      <div className="hero-content animate-fade-up">
        <h1>{t.heroTitle} <span>{t.heroTitleHighlight}</span></h1>
        <p>{t.heroSubtitle}</p>
        <div className="hero-buttons">
          <button className="btn accent-btn">{t.shopNow} <ArrowRight size={18}/></button>
          <button className="btn outline-btn"><Play size={18}/> {t.watchVideo}</button>
        </div>
      </div>
      <div className="hero-visual">
        <div className="glow-circle"></div>
        <img 
          src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Premium Watch" 
          className="floating-shoe"
        />
      </div>
    </section>
  );
};

export default Hero;
