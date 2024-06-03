import React, { Fragment } from 'react';
import { getFormattedDateWithRelativeDays } from '../../../tools';
import '../OrderAdmin.scss';

import TextInfo from '../TextInfo/TextInfo';

const OrderItemUser = ({ item }) => {
  const isClient = item?.authorInfo;

  return (
    <div className="order-list-item">
      <div className="order-info">
        <TextInfo label="Замовник:" text={item.contactName} />
        <TextInfo label="Місто:" text={item.city} />
        <TextInfo label="Отримувач:" text={item.recipientName} />
        <TextInfo label="Відділення:" text={item.address} />
      </div>

      {isClient && (
        <Fragment>
          <div className="order-info">
            <TextInfo label="Клієнт:" text={`${isClient?.firstName ?? ''} ${isClient?.lastName ?? ''}`} />
            <TextInfo label="Дата реєстрації:" text={getFormattedDateWithRelativeDays(isClient?.T)} />
            <TextInfo label="Email:" text={isClient?.email} />
            <TextInfo label="Область:" text={isClient?.region} />
            <TextInfo label="Телефон:" text={isClient?.phoneNumber} />
            <TextInfo label="Місто:" text={isClient?.city} />
            <TextInfo label="Номер:" text={isClient?.i} />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default OrderItemUser;
