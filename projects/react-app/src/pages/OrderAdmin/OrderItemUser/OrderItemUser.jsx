import React, { useState, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { request, getFormattedDateWithRelativeDays } from '../../../tools';
import { PrimaryButton, Typography, FlexBox, Product, Empty, Spin, Card, List, Divider } from '../../../components';
import '../OrderAdmin.scss';

import TextInfo from '../TextInfo/TextInfo';

const OrderItemUser = ({ item }) => {
  // const products = useSelector((state) => state.common.products) ?? [];
  // const item = products.find((item) => item._id === orderId);

  const [loading, setLoading] = useState(false);
  const [listOrders, setListOrders] = useState([]);
  const Title = ({ children, mt }) => <Typography children={children} mt={mt ?? 0} sz={18} fw={700} />;

  const isClient = item.authorInfo;

  return (
    <div className="order-list-item">
      <Spin spinning={loading}>
        <Card pl={16} className="order-info-card ">
          <div className="order-info">
            <TextInfo label="ПІБ Замовника:" text={item.contactName} />
            <TextInfo label="Місто Замовника:" text={item.city} />
            <TextInfo label="ПІБ Отримувача:" text={item.recipientName} />
            <TextInfo label="Поштове відділення:" text={item.address} />
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
        </Card>
      </Spin>
    </div>
  );
};

export default OrderItemUser;
