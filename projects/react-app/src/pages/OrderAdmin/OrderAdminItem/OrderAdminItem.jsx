import React, { useState, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { request, getFormattedDateWithRelativeDays } from '../../../tools';
import { PrimaryButton, Typography, FlexBox, Product, Empty, Spin, Card, List, Divider } from '../../../components';
import '../OrderAdmin.scss';

import CardInfo from './CardInfo';

const OrderAdminItem = ({ item }) => {
  // const products = useSelector((state) => state.common.products) ?? [];
  // const item = products.find((item) => item._id === orderId);

  const [loading, setLoading] = useState(false);
  const [listOrders, setListOrders] = useState([]);
  const Title = ({ children, mt }) => <Typography children={children} mt={mt ?? 0} sz={18} fw={700} />;

  const isClient = item.authorInfo;

  // useEffect(() => {
  //   const getListOrder = () => {
  //     console.log('onClickAddOrder');
  //     setLoading(true);

  //     request.get('/orders/getListOrder', {}, (res) => {
  //       setListOrders(res.data);
  //       console.log('res', res);
  //     });

  //     setLoading(false);
  //   };

  //   getListOrder();
  // }, []);

  console.table(item.authorInfo); // .authorInfo?

  return (
    <div className="order-list-item">
      <Spin spinning={loading}>
        <Card pl={16} className="order-info-card ">
          <Divider text="Дані про замовлення" />
          <div className="order-info">
            <CardInfo label="Дата:" text={getFormattedDateWithRelativeDays(item.t)} />
            <CardInfo label="Номер:" text={item.i} />
            <CardInfo label="Клієнт:" text={item.a} />
            <CardInfo label="Номер" text={item.i} />
          </div>

          {isClient && (
            <Fragment>
              <Divider text="Дані про клієнта" />
              <div className="order-info">
                <CardInfo label="Клієнт:" text={`${isClient?.firstName ?? ''} ${isClient?.lastName ?? ''}`} />
                <CardInfo label="Дата реєстрації:" text={getFormattedDateWithRelativeDays(isClient?.T)} />
                <CardInfo label="Email:" text={isClient?.email} />
                <CardInfo label="Область:" text={isClient?.region} />
                <CardInfo label="Телефон:" text={isClient?.phoneNumber} />
                <CardInfo label="Місто:" text={isClient?.city} />
                <CardInfo label="Номер:" text={isClient?.i} />
              </div>
            </Fragment>
          )}
        </Card>
      </Spin>
    </div>
  );
};

export default OrderAdminItem;
