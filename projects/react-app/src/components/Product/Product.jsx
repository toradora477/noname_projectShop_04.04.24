import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBasket } from '../../store/commonReducer';
import { Link } from 'react-router-dom';
import PrimaryButton from '../PrimaryButton/PrimaryButton.jsx';
import { ROUTES } from '../../common_constants/routes';
import { icon_heart_empty_red, icon_heart_empty_grey, img_test_murder } from '../../images';
import { Spin } from '../';
import './Product.scss';

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const isLikeProduct = item.likeProduct ? icon_heart_empty_red : icon_heart_empty_grey;
  const validImageProduct = img_test_murder ?? item.imageUrl; // TODO тестове

  const onPutInBasket = () => {
    setLoading(true);
    dispatch(addBasket(item._id));
    setLoading(false);
  };

  return (
    <div className="product">
      <Spin spinning={loading}>
        <img src={isLikeProduct} alt="svg like" className="product-like-icon " />

        <Link className="menu-admin-btn" to={`${ROUTES.CARD_PRODUCT}/${item._id}`}>
          <img src={validImageProduct} alt="product" className="product-main-image" />
        </Link>
        <h3>{item.n}</h3>
        <p>${item.p}</p>
        <PrimaryButton children="ДОДАТИ В КОШИК" onClick={onPutInBasket} />
      </Spin>
    </div>
  );
};

export default Product;
