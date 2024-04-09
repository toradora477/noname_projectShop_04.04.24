// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ROUTES } from '../../common_constants/routes';

// import icon_logo_1 from '../../images/icon_logo_1.svg';
// import icon_loupe from '../../images/icon_loupe.svg';
// import './MenuMain.scss';

// const BasketButton = () => {
//   return (
//     <div className="menu-main">
//       <Link className="company-logo" to={ROUTES.HOME_DASHBOARD}>
//         <img src={icon_logo_1} alt="Company Logo" />
//       </Link>
//       <div className="links">
//         <Link className="links-item" to={ROUTES.HOME_DASHBOARD} children="Головна" />
//         <Link className="links-item" to={ROUTES.SHOP} children="Магазин" />
//         <Link className="links-item" to={ROUTES.TOP_PRODAZH_ZA_MISYACZ} children="Лідери Продажів" />
//       </div>
//       <div className="search-bar">
//         <img className="loupe-icon" src={icon_loupe} alt="search magnifier" />
//         <button className="search-button" children="Пошук" />
//       </div>
//       <div className="cart-icon">
//         <img src="/path/to/cart-icon.png" alt="Shopping Cart" />
//       </div>
//     </div>
//   );
// };

// export default BasketButton;

import React from 'react';

// import { ShoppingCartOutlined } from '@ant-design/icons';

const BasketButton = () => {
  return (
    <button className="basket-button">
      <span className="icon">{/* <ShoppingCartOutlined /> */}2</span>
      <span className="price">"$19.99"</span>
    </button>
  );
};

export default BasketButton;
