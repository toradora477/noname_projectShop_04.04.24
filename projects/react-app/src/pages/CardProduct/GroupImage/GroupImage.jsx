import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../CardProduct.scss';
import { FlexBox, PreviewImage } from '../../../components';

const GroupImage = () => {
  const { productId } = useParams();

  const products = useSelector((state) => state.common.products) ?? [];

  const item = products.find((item) => item._id === productId);

  const allFiles = item?.f?.reduce((acc, color) => {
    return acc.concat(color.files);
  }, []);

  return (
    <FlexBox>
      <div className="product-group-second-image">
        {allFiles?.[1] && <PreviewImage alt="product" className="product-second-image" fileID={allFiles?.[1]} />}
        {allFiles?.[2] && <PreviewImage alt="product" className="product-second-image" fileID={allFiles?.[2]} />}
        {allFiles?.[3] && <PreviewImage alt="product" className="product-second-image" fileID={allFiles?.[3]} />}
      </div>
      <PreviewImage alt="product" className="product-main-image" fileID={allFiles?.[0]} />
    </FlexBox>
  );
};

export default GroupImage;
