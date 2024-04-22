import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PrimaryButton } from '../../../components';
import { ROLES } from '../../../common_constants/business';
import { ROUTES } from '../../../common_constants/routes';
import { icon_heart_empty_red, icon_heart_empty_grey, img_test_murder } from '../../../images';

import './ProductAdminItem.scss';

const ProductAdminItem = ({ item }) => {
  const userAuth = useSelector((state) => state.common.userAuth);
  const { role = 'guest' } = userAuth;
  const [admin, userOrBelow] = [ROLES[role] === ROLES.admin, ROLES[role] >= ROLES.user];

  const isLikeProduct = item.likeProduct ? icon_heart_empty_red : icon_heart_empty_grey;
  const validImageProduct = img_test_murder ?? item.imageUrl; // TODO тестове

  return (
    <div className="product-admin-item ">
      {userOrBelow && <img src={isLikeProduct} alt="svg like" className="product-like-icon " />}
      <Link className="menu-admin-btn" to={`${ROUTES.CARD_PRODUCT}/${item._id}`}>
        <img src={validImageProduct} alt="product" className="product-main-image" />
      </Link>
      <h3>{item.name}</h3>
      <p>${item.price}</p>
      {userOrBelow && <PrimaryButton children="ДОДАТИ В КОШИК" />}
      {admin && (
        <>
          <PrimaryButton color="blue" children="Додаткова інформація" />
          <PrimaryButton mt={8} color="orange" children="Редагувати" />
          <PrimaryButton mt={8} color="red" children="Видалити" />
        </>
      )}
    </div>
  );
};

export default ProductAdminItem;
