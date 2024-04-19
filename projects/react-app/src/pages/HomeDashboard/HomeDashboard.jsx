import React from 'react';
import { useSelector } from 'react-redux';

import { Card } from '../../components';
import { billboardHomeDashboard } from '../../images';
import './HomeDashboard.scss';

const HomeDashboard = () => {
  const products = useSelector((state) => state.common.products) ?? [];

  const listHotNews = products.slice(0, 5); // TODO потім змінити на фільтрацію по значенням
  const listSalesLeaders = products.slice(0, 10); // TODO потім змінити на фільтрацію по значенням

  return (
    <div className="home-dashboard-page">
      <img src={billboardHomeDashboard} alt="billboard" />
      <Card mt={75} title="Гарячі новинки" list={listHotNews} />
      <Card mt={75} title="Лідери продажів" list={listSalesLeaders} />
    </div>
  );
};

export default HomeDashboard;
