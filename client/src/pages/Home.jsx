import React from 'react';
import HeroSwiper from '../components/HeroSwiper';
import CategoriesSection from '../components/CategoriesSection';
import NewArrivalsSwiper from '../components/NewArrivalsSwiper';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

const Home = ({ onAddToCart }) => {
  return (
    <>
      <HeroSwiper />
      <CategoriesSection />
      <NewArrivalsSwiper onAddToCart={onAddToCart} />
      <ProductGrid onAddToCart={onAddToCart} />
      <Footer />
    </>
  );
};

export default Home;
