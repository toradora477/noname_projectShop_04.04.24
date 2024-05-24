import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { request } from '../../../../tools';
import { PrimaryButton, Typography, FlexBox, Product, Empty, Spin } from '../../../../components';

import { PLACING_AN_ORDER } from '../../../../common_constants/modals';
import { setModal } from '../../../../store/commonReducer';
import '../../PersonalOffice.scss';

const CardBasketList = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.common.basket) ?? [];
  const products = useSelector((state) => state.common.products) ?? [];
  const [loading, setLoading] = useState(false);
  const Title = ({ children, mt }) => <Typography children={children} mt={mt ?? 0} sz={18} fw={700} />;

  const filteredProducts = products.filter((product) => basket.includes(product._id));
  // console.log(filteredProducts);

  const textAdd = `Купити${filteredProducts?.length > 1 ? '  все' : ''}`;
  // const onClickAddOrder = () => {
  //   console.log('onClickAddOrder');
  //   setLoading(true);

  //   const listID = filteredProducts.map((i) => (i = i._id));
  //   const body = { listID };

  //   request.post('/orders/addOrder', body, (res) => {
  //     console.log('res', res);
  //   });

  //   setLoading(false);
  // };

  const onClickAddOrder = () => dispatch(setModal({ name: PLACING_AN_ORDER }));

  return (
    <div>
      <Spin spinning={loading}>
        <Title mt={8} children="Вибрані товари" />
        {filteredProducts?.length > 0 ? (
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
            <PrimaryButton onClick={onClickAddOrder} children={textAdd} className="order-btn-add" />
          </Fragment>
        ) : (
          <Empty description="Кошик порожній" w={350} h={250} />
        )}
      </Spin>
    </div>
  );
};

export default CardBasketList;
