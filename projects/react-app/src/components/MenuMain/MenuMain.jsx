import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../common_constants/routes';
import { BASKET_OF_GOODS, AUTH } from '../../common_constants/modals';
import { setModal } from '../../store/commonReducer';

import icon_logo_1 from '../../images/icon_logo_1.svg';
import icon_user from '../../images/icon_user.svg';
import './MenuMain.scss';

const MenuMain = () => {
  const dispatch = useDispatch();

  const onBtnClickBasket = () => {
    dispatch(setModal({ name: BASKET_OF_GOODS }));
  };

  const onBtnClickAuth = () => {
    dispatch(setModal({ name: AUTH }));
  };

  return (
    <div className="menu-main">
      <div className="menu-part">
        <Link className="company-logo" to={ROUTES.HOME_DASHBOARD}>
          <img src={icon_logo_1} alt="Company Logo" />
        </Link>
        <div className="links">
          <Link className="links-item" to={ROUTES.HOME_DASHBOARD} children="Головна" />
          <Link className="links-item" to={ROUTES.SHOP} children="Магазин" />
          <Link className="links-item" to={ROUTES.TOP_PRODAZH_ZA_MISYACZ} children="Лідери Продажів" />
        </div>
      </div>
      <div className="menu-part">
        <button className="btn-auth" onClick={onBtnClickAuth}>
          <img src={icon_user} alt="Shopping Cart" />
        </button>
        <button className="search-button" children="Кошик" onClick={onBtnClickBasket} />
      </div>
    </div>
  );
};

export default MenuMain;
