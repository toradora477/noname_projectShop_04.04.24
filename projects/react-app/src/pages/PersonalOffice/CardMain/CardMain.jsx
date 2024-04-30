import React from 'react';
import { Card } from '../../../components';
import { NAME_SELECT } from '../../../common_constants/business';

import CardAccount from './CardAccount';
import CardWishList from './CardWishList';
import CardBasketList from './CardBasketList';

import '../PersonalOffice.scss';
import clsx from 'clsx';

const CardMain = ({ selectedCard }) => {
  const dynamicComponent =
    {
      [NAME_SELECT.ACCOUNT]: <CardAccount />,
      [NAME_SELECT.WISHLIST]: <CardWishList />,
      [NAME_SELECT.BASKETLIST]: <CardBasketList />,
    }[selectedCard] || null;
  return (
    <Card
      pl={16}
      className={clsx(
        'card-selected-path-two',

        'unselectedPersonalOffice',
      )}
    >
      {dynamicComponent}
    </Card>
  );
};

export default CardMain;
