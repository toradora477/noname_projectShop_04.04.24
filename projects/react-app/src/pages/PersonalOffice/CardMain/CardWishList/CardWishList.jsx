import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, FlexBox, Product, Empty } from '../../../../components';
import '../../PersonalOffice.scss';

const CardWishList = () => {
  const products = useSelector((state) => state.common.products) ?? [];
  const favoriteProducts = useSelector((state) => state.common.favoriteProducts) ?? [];

  const Title = ({ children, mt }) => <Typography children={children} mt={mt ?? 0} sz={18} fw={700} />;

  const listLikeProducts = []; // TODO Тестове, замінити
  return (
    <div>
      <Title mt={8} children="Вподобані товари" />
      {listLikeProducts?.length > 0 ? (
        <Fragment>
          {listLikeProducts.reduce((acc, item, index) => {
            if (index % 5 === 0) {
              acc.push(
                <FlexBox key={`flexbox-${index}`} style={{ flexWrap: 'wrap' }}>
                  {listLikeProducts.slice(index, index + 5).map((product) => (
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
        <Empty description="Немає бажаних" w={350} h={250} />
      )}
    </div>
  );
};

export default CardWishList;
