import React, { useState } from 'react';
import { Card, Typography, PrymaryIconBackground, FlexBox } from '../../components';
import { NAME_SELECT } from '../../common_constants/business';
import CardItem from './CardItem';
import './PersonalOffice.scss';
import {
  icon_user_white,
  icon_user_gray,
  icon_heart_empty_white,
  icon_heart_empty_gray,
  shopping_bag_color_white,
  shopping_bag_color_gray,
} from '../../images';
import clsx from 'clsx';

const PersonalOffice = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const [TItle, Text] = [
    ({ children, mt }) => <Typography children={children} mt={mt} sz={20} fw={600} />,
    ({ children, mt }) => <Typography children={children} mt={mt ?? 12} sz={12} fw={400} />,
  ];

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
  };

  return (
    <div className="personal-office">
      <FlexBox mt={0}>
        <div className="select-menu">
          <TItle children="Налаштування" />
          <CardItem
            selectedCard={selectedCard}
            handleCardClick={handleCardClick}
            iconSelected={icon_user_white}
            iconUnselected={icon_user_gray}
            cardId={NAME_SELECT.ACCOUNT}
            text="Особиста інформація"
          />
          <CardItem
            selectedCard={selectedCard}
            handleCardClick={handleCardClick}
            iconSelected={icon_heart_empty_white}
            iconUnselected={icon_heart_empty_gray}
            cardId={NAME_SELECT.WISHLIST}
            text="Вподобані товари"
          />
          <CardItem
            selectedCard={selectedCard}
            handleCardClick={handleCardClick}
            iconSelected={shopping_bag_color_white}
            iconUnselected={shopping_bag_color_gray}
            cardId={NAME_SELECT.BASKETLIST}
            text="Вибрані товари"
          />
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="select-menu">
          <TItle children={selectedCard ?? ''} />
          <CardItem
            selectedCard={selectedCard}
            handleCardClick={handleCardClick}
            cardId="account"
            iconSelected={icon_user_white}
            iconUnselected={icon_user_gray}
            title="Акаунт"
            text="Особиста інформація"
          />
          <CardItem
            selectedCard={selectedCard}
            handleCardClick={handleCardClick}
            cardId="wishlist"
            iconSelected={icon_heart_empty_white}
            iconUnselected={icon_heart_empty_gray}
            title="Список бажань"
            text="Вподобані товари"
          />
          <CardItem
            selectedCard={selectedCard}
            handleCardClick={handleCardClick}
            cardId="basketlist"
            iconSelected={shopping_bag_color_white}
            iconUnselected={shopping_bag_color_gray}
            title="Кошик"
            text="Вибрані товари"
          />
        </div>
      </FlexBox>
    </div>
  );
};

export default PersonalOffice;
