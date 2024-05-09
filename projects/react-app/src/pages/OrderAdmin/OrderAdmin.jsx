import React, { useState, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { request } from '../../tools';
import { PrimaryButton, Typography, FlexBox, Product, Empty, Spin, Card, List } from '../../components';
import './OrderAdmin.scss';

const OrderAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [listOrders, setListOrders] = useState([]);
  const Title = ({ children, mt }) => <Typography children={children} mt={mt ?? 0} sz={18} fw={700} />;

  useEffect(() => {
    const getListOrder = () => {
      console.log('onClickAddOrder');
      setLoading(true);

      request.get('/orders/getListOrder', {}, (res) => {
        setListOrders(res.data);
        console.log('res', res);
      });

      setLoading(false);
    };

    getListOrder();
  }, []);

  return (
    <div className="order_admin">
      <Spin spinning={loading}>
        <Card pl={16}>
          <Title mt={8} children="Список замовлень" />
          {listOrders?.length > 0 ? (
            <List dataSource={listOrders} renderItem={(item) => 'dddd'} />
          ) : (
            <Empty description="Список порожній" w={350} h={250} />
          )}
        </Card>
      </Spin>
    </div>
  );
};

export default OrderAdmin;
