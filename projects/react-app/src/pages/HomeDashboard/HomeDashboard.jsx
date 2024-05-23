import React from 'react';
import { useSelector } from 'react-redux';

import { Card } from '../../components';
import { PRODUCT_SUBCATEGORIES } from '../../common_constants/business';
import { billboardHomeDashboard } from '../../images';
import './HomeDashboard.scss';

const HomeDashboard = () => {
  const products = useSelector((state) => state.common.products) ?? [];

  return (
    <div className="home-dashboard-page">
      <img src={billboardHomeDashboard} alt="billboard" />
      <Card className="shadow" mt={75} title="ПОПУЛЯРНІ КАТЕГОРІЇ" listCategories={PRODUCT_SUBCATEGORIES.slice(0, 10)} />
      <Card className="shadow" mt={75} title="ГАРЯЧІ НОВИНКИ" listProducts={products.slice(0, 5)} />
      <Card className="shadow" mt={75} title="ЛІДЕРИ ПРОДАЖІВ" listProducts={products.slice(0, 10)} />
    </div>
  );
};

export default HomeDashboard;
