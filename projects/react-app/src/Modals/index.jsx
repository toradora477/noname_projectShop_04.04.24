import React from 'react';
import { useSelector } from 'react-redux';

import * as MODALS from '../common_constants/modals';

import BasketOfGoods from './BasketOfGoods';
import Auth from './Auth';
import ProductAdd from './ProductAdd';

const Modals = () => {
  const name = useSelector((state) => state.common.modal?.name);

  const modalComponent =
    name &&
    {
      [MODALS.BASKET_OF_GOODS]: <BasketOfGoods />,
      [MODALS.AUTH]: <Auth />,
      [MODALS.PRODUCT_ADD]: <ProductAdd />,
    }[name];

  return modalComponent || null;
};

export default Modals;
