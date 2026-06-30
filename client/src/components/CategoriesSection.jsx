import React, { useContext } from 'react';
import { AppContext } from '../App';
import { ArrowRight } from 'lucide-react';
import './CategoriesSection.css';

const CategoriesSection = () => {
  const { categories } = useContext(AppContext);

  return (
    <section className="categories-section section-container">
      <div className="section-heading">
        <h2>Shop by Category</h2>
        <a href="/products">Browse All <ArrowRight size={14} /></a>
      </div>
      <div className="categories-grid">
        {categories.map(cat => (
          <div key={cat.id} className="cat-card glass" style={{ '--cat-color': cat.color }}>
            <div className="cat-icon-wrap">
              <span className="cat-icon">{cat.icon}</span>
            </div>
            <h3>{cat.name}</h3>
            <span className="cat-link">Explore →</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
