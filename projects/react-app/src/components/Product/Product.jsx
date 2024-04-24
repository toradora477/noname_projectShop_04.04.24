import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PrimaryButton from '../PrimaryButton/PrimaryButton.jsx';
import { ROUTES } from '../../common_constants/routes';
import { icon_heart_empty_red, icon_heart_empty_grey, img_test_murder } from '../../images';

import './Product.scss';

const Product = ({ item }) => {
  // const userAuth = useSelector((state) => state.common.userAuth);
  // const { role = 'guest' } = userAuth;
  // const [admin, userOrBelow] = [ROLES[role] === ROLES.admin, ROLES[role] >= ROLES.user];

  const isLikeProduct = item.likeProduct ? icon_heart_empty_red : icon_heart_empty_grey;
  const validImageProduct = img_test_murder ?? item.imageUrl; // TODO тестове

  return (
    <div className="product">
      <img src={isLikeProduct} alt="svg like" className="product-like-icon " />

      <Link className="menu-admin-btn" to={`${ROUTES.CARD_PRODUCT}/${item._id}`}>
        <img src={validImageProduct} alt="product" className="product-main-image" />
      </Link>
      <h3>{item.n}</h3>
      <p>${item.p}</p>
      <PrimaryButton children="ДОДАТИ В КОШИК" />
    </div>
  );
};

export default Product;
