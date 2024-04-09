import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../common_constants/routes';

import BasketButton from './BasketButton';

import icon_logo_1 from '../../images/icon_logo_1.svg';
import icon_loupe from '../../images/icon_loupe.svg';
import './MenuMain.scss';

const MenuMain = () => {
  return (
    <div className="menu-main">
      <Link className="company-logo" to={ROUTES.HOME_DASHBOARD}>
        <img src={icon_logo_1} alt="Company Logo" />
      </Link>
      <div className="links">
        <Link className="links-item" to={ROUTES.HOME_DASHBOARD} children="Головна" />
        <Link className="links-item" to={ROUTES.SHOP} children="Магазин" />
        <Link className="links-item" to={ROUTES.TOP_PRODAZH_ZA_MISYACZ} children="Лідери Продажів" />
      </div>
      <div className="search-bar">
        <img className="loupe-icon" src={icon_loupe} alt="search magnifier" />
        <button className="search-button" children="Пошук" />
      </div>
      <div className="cart-icon">
        <img src="/path/to/cart-icon.png" alt="Shopping Cart" />
      </div>
      <BasketButton />
    </div>
  );
};

export default MenuMain;
