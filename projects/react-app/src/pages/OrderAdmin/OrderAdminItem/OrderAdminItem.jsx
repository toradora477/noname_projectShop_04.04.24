import React, { useState, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { request, getFormattedDateWithRelativeDays } from '../../../tools';
import { PrimaryButton, Typography, FlexBox, Product, Empty, Spin, Card, List } from '../../../components';
import '../OrderAdmin.scss';

import CardInfo from './CardInfo';

const OrderAdminItem = ({ item }) => {
  // const products = useSelector((state) => state.common.products) ?? [];
  // const item = products.find((item) => item._id === orderId);

  const [loading, setLoading] = useState(false);
  const [listOrders, setListOrders] = useState([]);
  const Title = ({ children, mt }) => <Typography children={children} mt={mt ?? 0} sz={18} fw={700} />;

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

  console.table(item);

  return (
    <div className="order-list-item">
      <Spin spinning={loading}>
        <Card pl={16} className="order-info-card ">
          <div className="order-info">
            <CardInfo label="Дата" text={getFormattedDateWithRelativeDays(item.t)} />
            <CardInfo label="Номер" text={item.i} />
            <CardInfo label="Дата" text={getFormattedDateWithRelativeDays(item.t)} />
            <CardInfo label="Номер" text={item.i} />
          </div>
        </Card>
      </Spin>
    </div>
  );
};

export default OrderAdminItem;
