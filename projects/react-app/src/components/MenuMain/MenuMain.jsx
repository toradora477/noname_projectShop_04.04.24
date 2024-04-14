import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../common_constants/routes';
import { BASKET_OF_GOODS } from '../../common_constants/modals';
import { setModal } from '../../store/commonReducer';

import icon_logo_1 from '../../images/icon_logo_1.svg';
import icon_loupe from '../../images/icon_loupe.svg';
import './MenuMain.scss';

const MenuMain = () => {
  const dispatch = useDispatch();

  const onClientBtnClick = () => {
    dispatch(setModal({ name: BASKET_OF_GOODS }));
  };

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
      <button className="search-button" children="Кошик" onClick={onClientBtnClick} />
    </div>
  );
};

export default MenuMain;
