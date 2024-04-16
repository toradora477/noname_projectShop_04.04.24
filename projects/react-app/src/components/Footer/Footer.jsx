import React from 'react';
import dayjs from 'dayjs';
import './Footer.scss';
import { PHONE_VIEW, EMAIL_VIEW, COMPANY_NAME, WORKING_HOURS, WORKING_DAYS } from '../../common_constants/business';
import { icon_payment_group } from '../../images';

const Footer = () => {
  const currentYear = dayjs().format('YYYY');

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3>Про нас</h3>
          <p>
            {COMPANY_NAME} - ваш партнер у світі стильного та якісного одягу. Наші вироби поєднують унікальний дизайн з високою якістю матеріалів.
            З&nbsp;
            {COMPANY_NAME} ви будете завжди виглядати стильно та впевнено.
          </p>
        </div>
        <div className="footer__section">
          <h3>Час роботи</h3>
          <p>
            {WORKING_DAYS.START_WEEK} - {WORKING_DAYS.END_WEEK} {WORKING_HOURS.START_DAY} до {WORKING_HOURS.END_DAY}
          </p>
        </div>
        <div className="footer__section">
          <h3>Інформація</h3>
          <ul>
            <li>
              <a href="#">Про нас</a>
            </li>
            <li>
              <a href="#">Доставка</a>
            </li>
            <li>
              <a href="#">Обмін та повернення</a>
            </li>
            <li>
              <a href="#">Поширені запитання</a>
            </li>
            <li>
              <a href="#">Політика конфіденційності</a>
            </li>
          </ul>
        </div>
        <div className="footer__section">
          <h3>Допомога</h3>
          <ul>
            <li>
              <a href="#">Зв’язок з нами</a>
            </li>
            <li>
              <a href="#">Відстеження замовлення</a>
            </li>
          </ul>
        </div>
        <div className="footer__section">
          <h3>Оплата</h3>
          <ul>
            <li>Банківською карткою</li>
            <li>При отриманні</li>
            <li>Електронний сертифікат</li>
          </ul>
        </div>
      </div>
      <div className="footer__contact">
        <h3>Зв’яжіться з нами</h3>
        <p>Телефон: {PHONE_VIEW}</p>
        <p>E-mail: {EMAIL_VIEW}</p>
      </div>
      <div className="footer__social">
        <h3>Ми в Instagram і Telegram</h3>
        <a href="#">INSTAGRAM</a>
        <a href="#">TELEGRAM</a>
      </div>
      <div className="footer__copyright">
        <p>
          © {currentYear} {COMPANY_NAME} | Створено роботом з любов'ю❤️
        </p>
        <img src={icon_payment_group} alt="Payment group" />
      </div>
    </footer>
  );
};

export default Footer;
