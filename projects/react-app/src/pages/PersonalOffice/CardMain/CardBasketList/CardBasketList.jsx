import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, FlexBox, Product, Empty } from '../../../../components';
import '../../PersonalOffice.scss';

const CardBasketList = () => {
  const basket = useSelector((state) => state.common.basket) ?? [];
  const products = useSelector((state) => state.common.products) ?? [];

  const Title = ({ children, mt }) => <Typography children={children} mt={mt ?? 0} sz={18} fw={700} />;

  const filteredProducts = products.filter((product) => basket.includes(product._id));
  console.log(filteredProducts);
  return (
    <div>
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
        </Fragment>
      ) : (
        <Empty description="Кошик порожній" w={350} h={250} />
      )}
    </div>
  );
};

export default CardBasketList;
