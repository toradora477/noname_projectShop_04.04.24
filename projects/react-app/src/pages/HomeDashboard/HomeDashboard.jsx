import React from 'react';
import { useSelector } from 'react-redux';

import { Product } from '../../components';

import billboardHomeDashboard from '../../images/billboard-HomeDashboard.png';

const HomeDashboard = () => {
  const products = useSelector((state) => state.common.products) ?? [];

  return (
    <div className="shop-page">
      {/* <h1>Shop</h1> */}
      <img src={billboardHomeDashboard} alt="billboard" />
      <div className="product-list">
        {products.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default HomeDashboard;
