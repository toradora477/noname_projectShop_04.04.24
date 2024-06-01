import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFormattedDateWithRelativeDays } from '../../../tools';
import { Card } from '../../../components';
import '../OrderAdmin.scss';

import TextInfo from '../TextInfo/TextInfo';

const OrderListItem = ({ item }) => {
  // const products = useSelector((state) => state.common.products) ?? [];
  // const _products = products.map((product) =>
  //   item.products.some((itemProduct) => itemProduct.productId === product._id)
  //     ? { ...product, quantity: item.products.find((i) => i.productId === product._id).quantity }
  //     : product,
  // );

  // const totalQuantity = _products.reduce((acc, product) => acc + (product.quantity || 0), 0);
  // const totalCost = _products.reduce((acc, product) => acc + product.p * (product.quantity || 0), 0);

  // console.log('Загальна кількість продуктів:', totalQuantity);
  // console.log('Загальна вартість продуктів:', totalCost);

  const products = useSelector((state) => state.common.products) ?? [];
  const productMap = new Map(item.products.map(({ productId, quantity }) => [productId, quantity]));

  const totalQuantity = products.reduce((acc, { _id }) => acc + (productMap.has(_id) ? productMap.get(_id) : 0), 0);
  const totalCost = products.reduce((acc, { _id, p }) => acc + (productMap.has(_id) ? productMap.get(_id) * p : 0), 0);

  console.log('Загальна кількість продуктів:', totalQuantity);
  console.log('Загальна вартість продуктів:', totalCost);

  return (
    <div className="order-list-item">
      <Card pl={16} className="order-info-card ">
        <div className="order-info">
          <TextInfo label="Дата:" text={getFormattedDateWithRelativeDays(item.t)} />
          <TextInfo label="Товари:" text={totalQuantity} />
          <TextInfo label="Замовлення:" text={'№' + item.i} />
          <TextInfo label="Сума:" text={totalCost + ' ₴'} />
        </div>
      </Card>
    </div>
  );
};

export default OrderListItem;
