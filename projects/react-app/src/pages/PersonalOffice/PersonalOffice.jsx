import React from 'react';
import { Card, Typography, PrymaryIconBackground, FlexBox } from '../../components';
import './PersonalOffice.scss';
import { icon_heart_empty_red, icon_heart_empty_white, icon_user_white } from '../../images';

const PersonalOffice = () => {
  const [TItle, Text] = [
    ({ children, mt }) => <Typography children={children} mt={mt} sz={14} fw={700} />,
    ({ children, mt }) => <Typography children={children} mt={mt ?? 12} sz={13} fw={400} />,
  ];

  return (
    <div className="personal-office">
      <Card pl={16} className="personal-office-card">
        <FlexBox>
          <PrymaryIconBackground image={icon_user_white} backgroundColor="primary" />
          &nbsp;&nbsp;
          <div>
            <TItle>Акаунт</TItle>
            <Text>Особиста інформація</Text>
          </div>
        </FlexBox>
      </Card>
      <Card pl={16} className="personal-office-card">
        <FlexBox>
          <PrymaryIconBackground image={icon_heart_empty_white} />
          &nbsp;&nbsp;
          <div>
            <TItle>Список бажань</TItle>
            <Text>Вподобані товари</Text>
          </div>
        </FlexBox>
      </Card>
      <br />
      <Card pl={16} className="personal-office-card">
        <FlexBox>
          <PrymaryIconBackground image={icon_user_white} />
          &nbsp;&nbsp;
          <div>
            <TItle>Акаунт</TItle>
            <Text>Особиста інформація</Text>
          </div>
        </FlexBox>
      </Card>
      <Card pl={16} className="personal-office-card">
        <FlexBox>
          <PrymaryIconBackground image={icon_heart_empty_white} backgroundColor="primary" />
          &nbsp;&nbsp;
          <div>
            <TItle>Список бажань</TItle>
            <Text>Вподобані товари</Text>
          </div>
        </FlexBox>
      </Card>
    </div>
  );
};

export default PersonalOffice;
