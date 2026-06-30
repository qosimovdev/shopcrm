import React, { useContext } from 'react';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

const ProductsPage = ({ onAddToCart }) => {
  return (
    <>
      <div style={{ paddingTop: 80 }}>
        <ProductGrid onAddToCart={onAddToCart} />
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
