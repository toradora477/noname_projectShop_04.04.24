import React from 'react';
import { useSelector } from 'react-redux';

import * as MODALS from '../common_constants/modals';

import BasketOfGoods from './BasketOfGoods';

const Modals = () => {
  const name = useSelector((state) => state.common.modal?.name);

  // switch (name) {
  //   case MODALS.BASKET_OF_GOODS:
  //     return <BasketOfGoods />;
  //   default:
  //     return null;
  // }

  console.log('name', name);

  // const modalComponent =
  //   {
  //     [MODALS.BASKET_OF_GOODS]: <BasketOfGoods />,
  //   }[name] || null;

  // return modalComponent;

  const modalComponent =
    name &&
    {
      [MODALS.BASKET_OF_GOODS]: <BasketOfGoods />,
    }[name];

  return modalComponent || null;
};

export default Modals;
