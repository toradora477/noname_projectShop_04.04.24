import React from 'react';
import { Card, Typography, PrymaryIconBackground, FlexBox } from '../../../components';
import '../PersonalOffice.scss';
import clsx from 'clsx';

const CardItem = ({ selectedCard, handleCardClick, cardId, iconSelected, iconUnselected, text }) => {
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
          <div className="text-card">
            <TItle children={cardId} />
            <Text children={text} />
          </div>
        </FlexBox>
      </Card>
    </button>
  );
};

export default CardItem;
