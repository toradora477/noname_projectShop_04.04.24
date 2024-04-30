import React, { useState } from 'react';
import { Card, Typography, PrymaryIconBackground, FlexBox, Box } from '../../components';
import './PersonalOffice.scss';
import { icon_heart_empty_white, icon_user_white } from '../../images';
import clsx from 'clsx';

const CardItem = ({ selectedCard, handleCardClick, cardId, icon, title, text }) => {
  const [TItle, Text] = [
    ({ children }) => <Typography children={children} mt={0} sz={14} fw={700} />,
    ({ children }) => <Typography children={children} mt={7} sz={13} fw={400} />,
  ];

  return (
    <button className="button-like-card" onClick={() => handleCardClick(cardId)}>
      <Card
        pl={16}
        className={clsx('personal-office-card', {
          selectedPersonalOffice: selectedCard === cardId,
          unselectedPersonalOffice: selectedCard !== cardId,
        })}
      >
        <FlexBox>
          <PrymaryIconBackground image={icon} backgroundColor={selectedCard === cardId ? 'primary' : ''} />
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
          icon={icon_user_white}
          title="Акаунт"
          text="Особиста інформація"
        />
        <CardItem
          selectedCard={selectedCard}
          handleCardClick={handleCardClick}
          cardId="wishlist"
          icon={icon_heart_empty_white}
          title="Список бажань"
          text="Вподобані товари"
        />
        <CardItem
          selectedCard={selectedCard}
          handleCardClick={handleCardClick}
          cardId="basketlist"
          icon={icon_heart_empty_white}
          title="Кошик"
          text="Вибрані товари"
        />
      </div>
    </div>
  );
};

export default PersonalOffice;
