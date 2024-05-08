import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../CardProduct.scss';
import { FlexBox } from '../../../components';
import { img_test_murder } from '../../../images';

const GroupImage = () => {
  const { productId } = useParams();

  const products = useSelector((state) => state.common.products) ?? [];

  const item = products.find((item) => item._id === productId);
  const validImageProduct = img_test_murder ?? item.imageUrl; // TODO тестове

  return (
    <FlexBox>
      <div className="product-group-second-image">
        <img src={validImageProduct} alt="product" className="product-second-image" />
        <img src={validImageProduct} alt="product" className="product-second-image" />
        <img src={validImageProduct} alt="product" className="product-second-image" />
      </div>
      <img src={validImageProduct} alt="product" className="product-main-image" />
    </FlexBox>
  );
};

export default GroupImage;
