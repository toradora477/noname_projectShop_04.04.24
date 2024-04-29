import React from 'react';
import { Card, Typography, PrymaryIconBackground } from '../../components';
import './PersonalOffice.scss';
import { icon_heart_empty_red, icon_heart_empty_white, icon_user_white } from '../../images';

// Налаштування

// Акаунт
// Особиста інформація

// Список бажань
// Вподобані товари

const PersonalOffice = () => {
  return (
    <div className="personal-office">
      <br />
      <Card pl={35}>sdd</Card>
      personal-office
      <PrymaryIconBackground image={icon_user_white} backgroundColor="primary" />
      <PrymaryIconBackground image={icon_heart_empty_white} />
      <PrymaryIconBackground image={icon_user_white} />
      <PrymaryIconBackground image={icon_heart_empty_white} backgroundColor="primary" />
      <br />
    </div>
  );
};

export default PersonalOffice;
