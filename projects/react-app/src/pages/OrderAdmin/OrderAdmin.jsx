import React, { useState, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { request } from '../../tools';
import { PrimaryButton, Typography, FlexBox, Product, Empty, Spin, Card, List, Divider } from '../../components';
import OrderListItem from './OrderListItem';
import OrderItemInfo from './OrderItemInfo';
import OrderItemUser from './OrderItemUser';
import './OrderAdmin.scss';

const OrderAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [listOrders, setListOrders] = useState([]);

  useEffect(() => {
    const getListOrder = () => {
      setLoading(true);

      request.get('/orders/getListOrder', {}, (res) => {
        setListOrders(res.data);
        console.log(res.data?.[0]);
        // console.log('res', res);
      });

      setLoading(false);
    };

    getListOrder();
  }, []);

  return (
    <div className="order-admin">
      <Spin spinning={loading}>
        <FlexBox alignItems="flex-start">
          <Card pl={16}>
            <Divider sz={18} fw={700} text="Список замовлень" />
            <List dataSource={listOrders} renderItem={(item) => <OrderListItem item={item} />} />
          </Card>
          <div>
            <Card pl={16}>
              <Divider sz={18} fw={700} text="Дані про клієнта" />
              <List dataSource={listOrders} renderItem={(item) => <OrderItemUser item={item} />} />
            </Card>
            <Card mt={20} pl={16}>
              <Divider sz={18} fw={700} text="Дані про товар" />
              <List dataSource={listOrders} renderItem={(item) => <OrderItemInfo item={item} />} />
            </Card>
          </div>
        </FlexBox>
      </Spin>
    </div>
  );
};

export default OrderAdmin;
