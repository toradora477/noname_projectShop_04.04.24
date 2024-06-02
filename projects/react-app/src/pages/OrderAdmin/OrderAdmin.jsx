import React, { useState, useEffect } from 'react';

import { request } from '../../tools';
import { FlexBox, Spin, Card, List, Divider, Box } from '../../components';
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
          <Box ml={20}>
            <Card pl={16}>
              <Divider sz={18} fw={700} text="Дані про клієнта" />
              <List dataSource={listOrders} renderItem={(item) => <OrderItemUser item={item} />} />
            </Card>
            <Card mt={20} pl={16}>
              <Divider sz={18} fw={700} text="Дані про товар" />
              <List dataSource={listOrders} renderItem={(item) => <OrderItemInfo item={item} />} />
            </Card>
          </Box>
        </FlexBox>
      </Spin>
    </div>
  );
};

export default OrderAdmin;
