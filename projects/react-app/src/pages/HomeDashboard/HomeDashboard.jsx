import React from 'react';
import { useSelector } from 'react-redux';
import Product from '../../components/Product';

import billboardHomeDashboard from '../../images/billboard-HomeDashboard.png';

const HomeDashboard = () => {
  const products = useSelector((state) => state.common.products) ?? [];

  return (
    <div className="shop-page">
      {/* <h1>Shop</h1> */}
      <img src={billboardHomeDashboard} alt="billboard" />
      <div className="product-list">
        {products.map((product) => (
          <Product key={product.id} name={product.name} price={product.price} imageUrl={product.imageUrl} />
        ))}
      </div>
    </div>
  );
};

export default HomeDashboard;
