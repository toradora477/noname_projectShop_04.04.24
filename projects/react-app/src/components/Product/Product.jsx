import React from 'react';
import PrimaryGradientBtn from '../PrimaryGradientBtn';

import { icon_heart_empty_red, icon_heart_empty_grey, img_test_murder } from '../../images';

import './Product.scss';

const Product = ({ item }) => {
  const isLikeProduct = item.likeProduct ? icon_heart_empty_red : icon_heart_empty_grey;
  const validImageProduct = img_test_murder ?? item.imageUrl; // TODO тестове

  return (
    <div className="product">
      <img src={isLikeProduct} alt="svg like" className="product-like-icon " />
      <img src={validImageProduct} alt="product" className="product-main-image" />
      <h3>{item.name}</h3>
      <p>${item.price}</p>
      <PrimaryGradientBtn children="ДОДАТИ В КОШИК" />
    </div>
  );
};

export default Product;
