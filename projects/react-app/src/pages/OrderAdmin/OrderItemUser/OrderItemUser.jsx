import React, { Fragment } from 'react';
import { getFormattedDateWithRelativeDays } from '../../../tools';
import '../OrderAdmin.scss';
import { RowGroup } from '../../../components';

const OrderItemUser = ({ item }) => {
  const isClient = item?.authorInfo;
  const { TextInfo } = RowGroup;
  return (
    <div className="order-list-item">
      <RowGroup>
        <TextInfo label="Замовник:" text={item.contactName} />
        <TextInfo label="Місто:" text={item.city} />
        <TextInfo label="Отримувач:" text={item.recipientName} />
        <TextInfo label="Відділення:" text={item.address} />
      </RowGroup>

      {isClient && (
        <Fragment>
          <RowGroup>
            <TextInfo label="Клієнт:" text={`${isClient?.firstName ?? ''} ${isClient?.lastName ?? ''}`} />
            <TextInfo label="Дата реєстрації:" text={getFormattedDateWithRelativeDays(isClient?.T)} />
            <TextInfo label="Email:" text={isClient?.email} />
            <TextInfo label="Область:" text={isClient?.region} />
            <TextInfo label="Телефон:" text={isClient?.phoneNumber} />
            <TextInfo label="Місто:" text={isClient?.city} />
            <TextInfo label="Номер:" text={isClient?.i} />
          </RowGroup>
        </Fragment>
      )}
    </div>
  );
};

export default OrderItemUser;
