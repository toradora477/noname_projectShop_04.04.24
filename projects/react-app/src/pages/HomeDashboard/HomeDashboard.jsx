import React from 'react';
import Product from '../../components/Product';
import { PRODUCTS } from '../../common_constants/testDataBase';

const HomeDashboard = () => {
  return (
    <div className="shop-page">
      <h1>Shop</h1>
      <div className="product-list">
        {PRODUCTS.map((product) => (
          <Product key={product.id} name={product.name} price={product.price} imageUrl={product.imageUrl} />
        ))}
      </div>
    </div>
  );
};

export default HomeDashboard;
