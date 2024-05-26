import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setModal } from '../../../../store/commonReducer';
import { PLACING_AN_ORDER } from '../../../../common_constants/modals';
import { PrimaryButton, Typography, FlexBox, Product, Empty, Spin } from '../../../../components';

const CardBasketList = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.common.basket) ?? [];
  const products = useSelector((state) => state.common.products) ?? [];
  const filteredProducts = products.filter((product) => basket.includes(product._id));

  const onClickAddOrder = () => dispatch(setModal({ name: PLACING_AN_ORDER }));

  return (
    <div>
      <Spin spinning={false}>
        <Typography sz={18} fw={700} mt={8}>
          Вибрані товари
        </Typography>
        {filteredProducts.length > 0 ? (
          <Fragment>
            {filteredProducts.reduce((acc, item, index) => {
              if (index % 5 === 0) {
                acc.push(
                  <FlexBox key={`flexbox-${index}`} style={{ flexWrap: 'wrap' }}>
                    {filteredProducts.slice(index, index + 5).map((product) => (
                      <Product key={product._id} item={product} />
                    ))}
                  </FlexBox>,
                );
                acc.push(<br key={`br-${index}`} />);
              }
              return acc;
            }, [])}
            <br />
            <PrimaryButton onClick={onClickAddOrder} children={`Купити${filteredProducts.length > 1 ? ' все' : ''}`} className="order-btn-add" />
          </Fragment>
        ) : (
          <Empty description="Кошик порожній" w={350} h={250} />
        )}
      </Spin>
    </div>
  );
};

export default CardBasketList;
