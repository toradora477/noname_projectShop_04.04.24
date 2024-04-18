import React from 'react';
import dayjs from 'dayjs';
import './Footer.scss';
import { COMPANY_NAME, WORKING_HOURS, WORKING_DAYS } from '../../common_constants/business';
import { icon_instagram, icon_telegram, icon_tictoc } from '../../images';
import { Typography, FlexBox } from '../';

const Footer = () => {
  const currentYear = dayjs().format('YYYY');

  const [TItle, Text] = [
    ({ children, mt }) => <Typography children={children} mt={mt} sz={14} fw={700} />,
    ({ children, mt }) => <Typography children={children} mt={mt ?? 12} sz={12} fw={400} />,
  ];

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <TItle>Про нас</TItle>
          <Text
            children={`${COMPANY_NAME} - ваш партнер у світі стильного та якісного одягу. Наші вироби поєднують унікальний дизайн з високою якістю матеріалів. З ${COMPANY_NAME} ви будете завжди виглядати стильно та впевнено.`}
          />

          <TItle mt={30}>Час роботи</TItle>
          <Text>
            {WORKING_DAYS.START_WEEK} - {WORKING_DAYS.END_WEEK} {WORKING_HOURS.START_DAY} до {WORKING_HOURS.END_DAY}
          </Text>
        </div>

        <div className="footer__section">
          <TItle>Інформація</TItle>

          <Text>Про нас</Text>
          <Text>Доставка</Text>
          <Text>Обмін та повернення</Text>
          <Text>Поширені запитання</Text>
          <Text>Політика конфіденційності</Text>
        </div>

        <div className="footer__section">
          <TItle>Оплата</TItle>

          <Text>Банківською карткою</Text>
          <Text>При отриманні</Text>
        </div>

        <div className="footer__section">
          <TItle>Зв’яжіться з нами</TItle>

          <FlexBox mt={12}>
            <img src={icon_instagram} alt="btn-login" />
            &nbsp;&nbsp;
            <TItle>INSTAGRAM</TItle>
          </FlexBox>
          <FlexBox mt={30}>
            <img src={icon_telegram} alt="btn-login" />
            &nbsp;&nbsp;
            <TItle>TELEGRAM</TItle>
          </FlexBox>
          <FlexBox mt={30}>
            <img src={icon_tictoc} alt="btn-login" />
            &nbsp;&nbsp;
            <TItle>TIKTOK</TItle>
          </FlexBox>
        </div>
      </div>

      <div className="footer__copyright">
        <Text>
          © {currentYear} {COMPANY_NAME} | Всі права захищені
        </Text>
      </div>
    </footer>
  );
};

export default Footer;
