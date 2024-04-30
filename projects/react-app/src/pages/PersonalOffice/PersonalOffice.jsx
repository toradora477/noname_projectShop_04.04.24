import React, { useState } from 'react';
import { Card, Typography, PrymaryIconBackground, FlexBox } from '../../components';
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

const CardItem = ({ selectedCard, handleCardClick, cardId, iconSelected, iconUnselected, title, text }) => {
  const [TItle, Text] = [
    ({ children }) => <Typography children={children} mt={0} sz={14} fw={700} />,
    ({ children }) => <Typography children={children} mt={7} sz={13} fw={400} />,
  ];

  const isSelected = selectedCard === cardId;

  return (
    <button className="button-like-card" onClick={() => handleCardClick(cardId)}>
      <Card
        pl={16}
        className={clsx('personal-office-card', {
          selectedPersonalOffice: isSelected,
          unselectedPersonalOffice: !isSelected,
        })}
      >
        <FlexBox mt={0}>
          <PrymaryIconBackground image={isSelected ? iconSelected : iconUnselected} backgroundColor={isSelected ? 'primary' : ''} />
          &nbsp;&nbsp;
          <div>
            <TItle children={title} />
            <Text children={text} />
          </div>
        </FlexBox>
      </Card>
    </button>
  );
};

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
      <div className="select-menu">
        <TItle>Налаштування</TItle>
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
    </div>
  );
};

export default PersonalOffice;
