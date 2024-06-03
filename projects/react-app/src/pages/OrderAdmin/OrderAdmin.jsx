import React, { useState, useEffect, Fragment } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders } from '../../store/commonReducer';
import { request } from '../../tools';
import { FlexBox, Spin, Card, List, Divider, Box, Empty } from '../../components';
import OrderListItem from './OrderListItem';
import OrderItemInfo from './OrderItemInfo';
import OrderItemUser from './OrderItemUser';
import './OrderAdmin.scss';

const OrderAdmin = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.common.orders) ?? [];

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);
  const itemsPerPage = 10;

  const handleOrderItemClick = (order) => {
    setSelectedOrderItem(order);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = orders.slice(offset, offset + itemsPerPage);

  useEffect(() => {
    const getListOrder = async () => {
      setLoading(true);
      await request.get('/orders/getListOrder', {}, (res) => {
        dispatch(setOrders(res.data));
      });
      setLoading(false);
    };

    getListOrder();
  }, []);

  return (
    <div className="order-admin">
      <FlexBox alignItems="flex-start">
        <Card style={{ width: '450px' }} pl={16}>
          <Spin spinning={loading} tip="Зачекайте, йде завантаження">
            <Divider sz={18} fw={700} text="Список замовлень" />
            {orders?.length > 0 ? (
              <Fragment>
                <List
                  dataSource={currentPageData}
                  renderItem={(item) => (
                    <OrderListItem onClick={() => handleOrderItemClick(item)} isSelected={selectedOrderItem?._id === item._id} item={item} />
                  )}
                />

                {orders?.length > itemsPerPage && (
                  <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(orders.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                  />
                )}
              </Fragment>
            ) : (
              <Empty description="Немає замовлень" w={350} h={250} />
            )}
          </Spin>
        </Card>
        <Box ml={20}>
          <Card pl={16} style={{ width: '650px' }}>
            <Divider sz={18} fw={700} text="Дані про клієнта" />
            {selectedOrderItem ? (
              <OrderItemUser item={selectedOrderItem} />
            ) : (
              <div className="empty-container">
                <Empty description="Немає замовлень" w={350} h={250} />
              </div>
            )}
          </Card>
          <Card mt={20} pl={16} style={{ width: '650px' }}>
            <Divider sz={18} fw={700} text="Дані про товар" />
            {selectedOrderItem ? (
              <OrderItemInfo item={selectedOrderItem} />
            ) : (
              <div className="empty-container">
                <Empty description="Немає замовлень" w={350} h={250} />
              </div>
            )}
          </Card>
        </Box>
      </FlexBox>
    </div>
  );
};

export default OrderAdmin;
