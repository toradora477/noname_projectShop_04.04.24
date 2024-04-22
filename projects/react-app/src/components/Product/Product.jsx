import React from 'react';
import { useSelector } from 'react-redux';
import PrimaryButton from '../PrimaryButton/PrimaryButton.jsx';
import { ROLES } from '../../common_constants/business';
import { icon_heart_empty_red, icon_heart_empty_grey, img_test_murder } from '../../images';

import './Product.scss';

const Product = ({ item }) => {
  const userAuth = useSelector((state) => state.common.userAuth);
  const { role = 'guest' } = userAuth;
  const [admin, userOrBelow] = [ROLES[role] === ROLES.admin, ROLES[role] >= ROLES.user];

  const isLikeProduct = item.likeProduct ? icon_heart_empty_red : icon_heart_empty_grey;
  const validImageProduct = img_test_murder ?? item.imageUrl; // TODO тестове

  return (
    <div className="product">
      <img src={isLikeProduct} alt="svg like" className="product-like-icon " />
      <img src={validImageProduct} alt="product" className="product-main-image" />
      <h3>{item.name}</h3>
      <p>${item.price}</p>
      {userOrBelow && <PrimaryButton children="ДОДАТИ В КОШИК" />}
      {admin && (
        <>
          <PrimaryButton color="orange" children="Редагувати" />
          <PrimaryButton mt={8} color="red" children="Видалити" />
        </>
      )}
    </div>
  );
};

export default Product;
