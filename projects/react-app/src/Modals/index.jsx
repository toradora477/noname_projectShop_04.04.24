import React from 'react';
import { useSelector } from 'react-redux';

import * as MODALS from '../common_constants/modals';

import BasketOfGoods from './BasketOfGoods';

const Modals = () => {
  const name = useSelector((state) => state.common.modal?.name);

  switch (name) {
    case MODALS.BASKET_OF_GOODS:
      return <BasketOfGoods />;
    default:
      return null;
  }
};

export default Modals;
