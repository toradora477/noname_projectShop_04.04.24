import React from 'react';
import PrimaryGradientBtn from '../PrimaryGradientBtn';
import img_test_murder from '../../images/img_test_murder.webp';
import icon_heart_empty_grey from '../../images/icon-heart-empty-grey.svg';
import icon_heart_empty_red from '../../images/icon-heart-empty-red.svg';
import './Product.scss';

const Product = ({ item }) => {
  const isLikeProduct = item.likeProduct ? icon_heart_empty_red : icon_heart_empty_grey;
  const validImageProduct = img_test_murder ?? item.imageUrl; // TODO тестове

  return (
    <div className="product">
      <img src={isLikeProduct} alt="svg like" className="product-like-icon " />
      <img src={validImageProduct} alt="product image" className="product-main-image" />
      <h3>{item.name}</h3>
      <p>${item.price}</p>
      <PrimaryGradientBtn children="ДОДАТИ В КОШИК" />
    </div>
  );
};

export default Product;
