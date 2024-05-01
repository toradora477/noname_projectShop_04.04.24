import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, FlexBox } from '../../components';
import { NAME_SELECT, ROLES } from '../../common_constants/business';
import CardSelected from './CardSelected';
import CardMain from './CardMain';

import './PersonalOffice.scss';
import {
  icon_user_white,
  icon_user_gray,
  icon_heart_empty_white,
  icon_heart_empty_gray,
  shopping_bag_color_white,
  shopping_bag_color_gray,
} from '../../images';

const PersonalOffice = () => {
  const location = useLocation();
  const selectParam = location.state?.selectParam;

  const userAuth = useSelector((state) => state.common.userAuth),
    { role = 'guest' } = userAuth,
    isClientOrAbove = ROLES[role] <= ROLES.client;

  const [selectedCard, setSelectedCard] = useState(selectParam ?? null);

  const TItle = ({ children, mt }) => <Typography children={children} mb={8} mt={mt} sz={20} fw={600} />;

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
  };

  useEffect(() => {
    setSelectedCard(selectParam);
  }, [selectParam]);

  return (
    <div className="personal-office">
      <FlexBox mt={0}>
        <div className="select-menu">
          <TItle children="Налаштування" />
          {isClientOrAbove && (
            <CardSelected
              selectedCard={selectedCard}
              handleCardClick={handleCardClick}
              iconSelected={icon_user_white}
              iconUnselected={icon_user_gray}
              cardId={NAME_SELECT.ACCOUNT}
              text="Особиста інформація"
            />
          )}

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
          <CardMain selectedCard={selectedCard} />
        </div>
      </FlexBox>
    </div>
  );
};

export default PersonalOffice;
