import React from 'react';

import '../OrderAdmin.scss';
import { RowGroup } from '../../../components';

const OrderItemUser = ({ item }) => {
  const { TextInfo } = RowGroup;

  return (
    <div className="order-list-item">
      <RowGroup>
        <TextInfo label="Замовник:" text={`${item.firstName} ${item.lastName}`} />
        <TextInfo label="Телефон:" text={item.phoneNumber} />
        <TextInfo label="Отримувач:" text={item.recipient} />
        <TextInfo label="Email:" text={item.email} />
        <TextInfo label="Область:" text={item.region} />
        <TextInfo label="Місто:" text={item.city} />
        <TextInfo label="Відділення:" text={item.address} />
      </RowGroup>
    </div>
  );
};

export default OrderItemUser;
