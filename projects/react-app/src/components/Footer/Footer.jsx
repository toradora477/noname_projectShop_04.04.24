import React from 'react';

import './Footer.scss';

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer__container">
//         <div className="footer__section">
//           <h3>Про нас</h3>
//           <p>Інформація про ваш магазин та компанію.</p>
//         </div>
//         <div className="footer__section">
//           <h3>Контакти</h3>
//           <p>Ваша адреса, номер телефону, електронна адреса.</p>
//         </div>
//         <div className="footer__section">
//           <h3>Служба підтримки</h3>
//           <p>Інформація про те, як зв'язатися з вашою службою підтримки.</p>
//         </div>
//       </div>
//       <div className="footer__copyright">
//         <p>© 2024 Усі права захищені.</p>
//       </div>
//     </footer>
//   );
// };

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3>Про нас</h3>
          <p>
            Purple Lama - ваш партнер у світі стильного та якісного одягу. Наші вироби поєднують унікальний дизайн з високою якістю матеріалів. З
            Purple Lama ви будете завжди виглядати стильно та впевнено.
          </p>
        </div>
        <div className="footer__section">
          <h3>Час роботи</h3>
          <p>Понеділок - Неділя 11:00 до 22:00</p>
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
        <p>Телефон: +38(066)-280-6694</p>
        <p>E-mail: purplelama.ua@gmail.com</p>
      </div>
      <div className="footer__social">
        <h3>Ми в Instagram і Telegram</h3>
        <a href="#">INSTAGRAM</a>
        <a href="#">TELEGRAM</a>
      </div>
      <div className="footer__copyright">
        <p>© 2024 Усі права захищені.</p>
      </div>
    </footer>
  );
};

export default Footer;
