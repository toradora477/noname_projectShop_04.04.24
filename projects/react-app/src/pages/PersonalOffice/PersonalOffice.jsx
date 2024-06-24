import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Typography, FlexBox, Box } from '../../components';
import { NAME_SELECT } from '../../common_constants/business';

import {
  icon_user_white,
  icon_user_gray,
  icon_heart_empty_white,
  icon_heart_empty_gray,
  shopping_bag_color_white,
  shopping_bag_color_gray,
} from '../../images';

import CardSelected from './CardSelected';
import CardMain from './CardMain';

import './PersonalOffice.scss';

const PersonalOffice = () => {
  const location = useLocation();
  const selectParam = location.state?.selectParam;

  const { isDesktopScreen } = useSelector((state) => state.screenSize.deviceType);
  const { isNotAdmin, isClientOrAbove } = useSelector((state) => state.common.accessRoles);

  const [selectedCard, setSelectedCard] = useState(selectParam ?? null);

  const TItle = ({ children, mt }) => <Typography children={children} mb={16} mt={mt} sz={20} fw={600} />;

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
  };

  useEffect(() => {
    setSelectedCard(selectParam);
  }, [selectParam]);

  const componentContent = (
    <Fragment>
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

        {isNotAdmin && (
          <Fragment>
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
          </Fragment>
        )}
      </div>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <div className="select-menu">
        <TItle children={selectedCard ?? ''} />
        <CardMain selectedCard={selectedCard} />
      </div>
    </Fragment>
  );

  const contentForMobile = isDesktopScreen ? (
    <FlexBox mt={0} alignItems="flex-start" children={componentContent} />
  ) : (
    <Box mt={0} alignItems="flex-start" children={componentContent} />
  );

  return <div className="personal-office">{contentForMobile}</div>;
};

export default PersonalOffice;
