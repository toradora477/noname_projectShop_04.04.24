import React, { useState } from 'react';
import { Card, Typography, FlexBox } from '../../components';
import { NAME_SELECT } from '../../common_constants/business';
import CardSelected from './CardSelected';
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

const CardComponentBasketlist = ({ selectedCard }) => {
  console.log('selectedCard', selectedCard);
  return (
    <Card
      pl={16}
      className={clsx(
        'card-selected-path-two',

        'unselectedPersonalOffice',
      )}
    >
      <div>1 gegergergege gegergergegegegerg gegegge</div>
      <div>2 gegergergege gegergergegegegerg gegegge</div>
      <div>3 gegergergege gegergergegegegerg gegegge</div>
    </Card>
  );
};

const PersonalOffice = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const TItle = ({ children, mt }) => <Typography children={children} mb={8} mt={mt} sz={20} fw={600} />;

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
  };

  return (
    <div className="personal-office">
      <FlexBox mt={0}>
        <div className="select-menu">
          <TItle children="Налаштування" />
          <CardSelected
            selectedCard={selectedCard}
            handleCardClick={handleCardClick}
            iconSelected={icon_user_white}
            iconUnselected={icon_user_gray}
            cardId={NAME_SELECT.ACCOUNT}
            text="Особиста інформація"
          />
          <CardSelected
            selectedCard={selectedCard}
            handleCardClick={handleCardClick}
            iconSelected={icon_heart_empty_white}
            iconUnselected={icon_heart_empty_gray}
            cardId={NAME_SELECT.WISHLIST}
            text="Вподобані товари"
          />
          <CardSelected
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
          <CardComponentBasketlist selectedCard={selectedCard} />
        </div>
      </FlexBox>
    </div>
  );
};

export default PersonalOffice;
