import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../CardProduct.scss';
import { FlexBox, PreviewImage } from '../../../components';

const GroupImage = () => {
  const { productId } = useParams();

  const products = useSelector((state) => state.common.products) ?? [];

  const item = products.find((item) => item._id === productId);

  return (
    <FlexBox>
      <div className="product-group-second-image">
        {/* <img src={validImageProduct} alt="product" className="product-second-image" />
        <img src={validImageProduct} alt="product" className="product-second-image" />
        <img src={validImageProduct} alt="product" className="product-second-image" /> */}
        <PreviewImage alt="product" className="product-second-image" fileID={item?.f?.[0]} />
        <PreviewImage alt="product" className="product-second-image" fileID={item?.f?.[0]} />
        <PreviewImage alt="product" className="product-second-image" fileID={item?.f?.[0]} />
      </div>
      <PreviewImage alt="product" className="product-main-image" fileID={item?.f?.[0]} />
      {/* <img src={validImageProduct} alt="product" className="product-main-image" /> */}
    </FlexBox>
  );
};

export default GroupImage;
