import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFormattedDateWithRelativeDays } from '../../../tools';
import { Card } from '../../../components';
import '../OrderAdmin.scss';

import TextInfo from '../TextInfo/TextInfo';

const OrderListItem = ({ item }) => {
  const products = useSelector((state) => state.common.products) ?? [];
  // .authorInfo?
  const filteredProducts = products.filter((product) => [].includes(product._id));
  const finishCost = filteredProducts.reduce((acc, item) => acc + Number(item.p), 0);

  return (
    <div className="order-list-item">
      <Card pl={16} className="order-info-card ">
        <div className="order-info">
          <TextInfo label="Дата:" text={getFormattedDateWithRelativeDays(item.t)} />
          <TextInfo label="Номер:" text={item.i} />
        </div>
      </Card>
    </div>
  );
};

export default OrderListItem;
