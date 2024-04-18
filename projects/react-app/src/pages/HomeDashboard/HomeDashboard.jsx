import React from 'react';
import { useSelector } from 'react-redux';

import { Product } from '../../components';
import { billboardHomeDashboard } from '../../images';
import './HomeDashboard.scss';

const HomeDashboard = () => {
  const products = useSelector((state) => state.common.products) ?? [];

  return (
    <div className="home-dashboard-page">
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
