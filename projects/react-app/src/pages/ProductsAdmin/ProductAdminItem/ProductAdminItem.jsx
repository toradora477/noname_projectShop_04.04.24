import React from 'react';
import { Link } from 'react-router-dom';

import { PrimaryButton } from '../../../components';

import { ROUTES } from '../../../common_constants/routes';
import { img_test_murder } from '../../../images';

import './ProductAdminItem.scss';

const ProductAdminItem = ({ item }) => {
  const validImageProduct = img_test_murder ?? item.imageUrl; // TODO тестове

  return (
    <div className="product-admin-item ">
      <Link className="menu-admin-btn" to={`${ROUTES.CARD_PRODUCT}/${item._id}`}>
        <img src={validImageProduct} alt="product" className="product-main-image" />
      </Link>
      <h3>{item.n}</h3>
      <p>${item.p}</p>

      <PrimaryButton color="blue" children="Додаткова інформація" />
      <PrimaryButton mt={8} color="orange" children="Редагувати" />
      <PrimaryButton mt={8} color="red" children="Видалити" />
    </div>
  );
};

export default ProductAdminItem;
