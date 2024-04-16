import React from 'react';
import PrimaryGradientBtn from '../PrimaryGradientBtn';
import img_test_murder from '../../images/img_test_murder.webp';
import './Product.scss';

const Product = ({ name, price, imageUrl = img_test_murder }) => {
  return (
    <div className="product">
      <img src={img_test_murder} alt="product-image" className="product-image" />
      <h3>{name}</h3>
      <p>${price}</p>
      <PrimaryGradientBtn children="ДОДАТИ В КОШИК" />
    </div>
  );
};

export default Product;
