// import React from 'react';
// import { Card, Typography, PrymaryIconBackground, FlexBox } from '../../components';
// import './PersonalOffice.scss';
// import { icon_heart_empty_red, icon_heart_empty_white, icon_user_white } from '../../images';

// const PersonalOffice = () => {
//   const [TItle, Text] = [
//     ({ children, mt }) => <Typography children={children} mt={mt} sz={14} fw={700} />,
//     ({ children, mt }) => <Typography children={children} mt={mt ?? 7} sz={13} fw={400} />,
//   ];

//   return (
//     <div className="personal-office">
//       <Card pl={16} className="personal-office-card">
//         <FlexBox>
//           <PrymaryIconBackground image={icon_user_white} backgroundColor="primary" />
//           &nbsp;&nbsp;
//           <div>
//             <TItle>Акаунт</TItle>
//             <Text>Особиста інформація</Text>
//           </div>
//         </FlexBox>
//       </Card>
//       <Card pl={16} className="personal-office-card">
//         <FlexBox>
//           <PrymaryIconBackground image={icon_heart_empty_white} />
//           &nbsp;&nbsp;
//           <div>
//             <TItle>Список бажань</TItle>
//             <Text>Вподобані товари</Text>
//           </div>
//         </FlexBox>
//       </Card>
//       <br />
//       <Card pl={16} className="personal-office-card">
//         <FlexBox>
//           <PrymaryIconBackground image={icon_user_white} />
//           &nbsp;&nbsp;
//           <div>
//             <TItle>Акаунт</TItle>
//             <Text>Особиста інформація</Text>
//           </div>
//         </FlexBox>
//       </Card>
//       <Card pl={16} className="personal-office-card">
//         <FlexBox>
//           <PrymaryIconBackground image={icon_heart_empty_white} backgroundColor="primary" />
//           &nbsp;&nbsp;
//           <div>
//             <TItle>Список бажань</TItle>
//             <Text>Вподобані товари</Text>
//           </div>
//         </FlexBox>
//       </Card>
//     </div>
//   );
// };

// export default PersonalOffice;

import React, { useState } from 'react';
import { Card, Typography, PrymaryIconBackground, FlexBox } from '../../components';
import './PersonalOffice.scss';
import { icon_heart_empty_red, icon_heart_empty_white, icon_user_white } from '../../images';
import clsx from 'clsx';

const PersonalOffice = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
  };

  const [Title, Text] = [
    ({ children, mt }) => <Typography children={children} mt={mt} sz={14} fw={700} />,
    ({ children, mt }) => <Typography children={children} mt={mt ?? 7} sz={13} fw={400} />,
  ];

  return (
    <div className="personal-office">
      <button className="button-like-card" onClick={() => handleCardClick('account')}>
        <Card pl={16} className={clsx('personal-office-card', { selected: selectedCard === 'account' })}>
          <FlexBox>
            <PrymaryIconBackground image={icon_user_white} backgroundColor={selectedCard === 'account' ? 'primary' : ''} />
            &nbsp;&nbsp;
            <div>
              <Title>Акаунт</Title>
              <Text>Особиста інформація</Text>
            </div>
          </FlexBox>
        </Card>
      </button>
      <button className="button-like-card" onClick={() => handleCardClick('wishlist')}>
        <Card pl={16} className={clsx('personal-office-card', { selected: selectedCard === 'wishlist' })}>
          <FlexBox>
            <PrymaryIconBackground image={icon_heart_empty_white} backgroundColor={selectedCard === 'wishlist' ? 'primary' : ''} />
            &nbsp;&nbsp;
            <div>
              <Title>Список бажань</Title>
              <Text>Вподобані товари</Text>
            </div>
          </FlexBox>
        </Card>
      </button>
    </div>
  );
};

export default PersonalOffice;
