import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFormattedDateWithRelativeDays } from '../../../tools';
import { Card } from '../../../components';
import clsx from 'clsx';
import '../OrderAdmin.scss';

import TextInfo from '../TextInfo/TextInfo';

const OrderListItem = ({ item, onClick, isSelected }) => {
  const products = useSelector((state) => state.common.products) ?? [];
  const productMap = new Map(item.products.map(({ productId, quantity }) => [productId, quantity]));

  const totalQuantity = products.reduce((acc, { _id }) => acc + (productMap.has(_id) ? productMap.get(_id) : 0), 0);
  const totalCost = products.reduce((acc, { _id, p }) => acc + (productMap.has(_id) ? productMap.get(_id) * p : 0), 0);

  return (
    <div className={clsx('order-list-item')} onClick={onClick}>
      <Card
        pl={16}
        className={clsx('order-info-card ', {
          selectedOrder: isSelected,
          unselectedOrder: !isSelected && !item.ag,
          unselectedArchiveOrder: !isSelected && !!item.ag,
        })}
      >
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
