import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders } from '../../store/commonReducer';
import { request } from '../../tools';
import { FlexBox, Spin, Card, List, Divider, Box } from '../../components';
import OrderListItem from './OrderListItem';
import OrderItemInfo from './OrderItemInfo';
import OrderItemUser from './OrderItemUser';
import './OrderAdmin.scss';

const OrderAdmin = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.common.orders) ?? [];

  const [loading, setLoading] = useState(false);
  const [listOrders, setListOrders] = useState([]);

  useEffect(() => {
    const getListOrder = () => {
      setLoading(true);
      request.get('/orders/getListOrder', {}, (res) => {
        setListOrders(res.data);
        dispatch(setOrders(res.data));
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
            <List dataSource={orders} renderItem={(item) => <OrderListItem item={item} />} />
          </Card>
          <Box ml={20}>
            <Card pl={16}>
              <Divider sz={18} fw={700} text="Дані про клієнта" />
              <List dataSource={orders} renderItem={(item) => <OrderItemUser item={item} />} />
            </Card>
            <Card mt={20} pl={16}>
              <Divider sz={18} fw={700} text="Дані про товар" />
              <List dataSource={orders} renderItem={(item) => <OrderItemInfo item={item} />} />
            </Card>
          </Box>
        </FlexBox>
      </Spin>
    </div>
  );
};

export default OrderAdmin;
