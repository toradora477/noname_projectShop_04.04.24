import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../common_constants/routes';
import { BASKET_OF_GOODS, AUTH } from '../../common_constants/modals';
import { setModal } from '../../store/commonReducer';

import logo_menu_component from '../../images/logo-menu-component.png';
import icons8_user_96 from '../../images/icons8-user-96.png';
import icon_heart_empty_black from '../../images/icon-heart-empty-black.svg';
import shopping_bag_color from '../../images/shopping-bag-color.svg';
import './SideMenu.scss';

const SideMenu = () => {
  const dispatch = useDispatch();

  const onBtnClickBasket = () => {
    dispatch(setModal({ name: BASKET_OF_GOODS }));
  };

  const onBtnClickAuth = () => {
    dispatch(setModal({ name: AUTH }));
  };

  return (
    <div className="side-main">
      <div className="menu-part">
        <Link className="company-logo" to={ROUTES.HOME_DASHBOARD}>
          <img src={logo_menu_component} alt="Company Logo" />
        </Link>
        <div className="links">
          <Link className="links-item" to={ROUTES.HOME_DASHBOARD} children="Головна" />
          <Link className="links-item" to={ROUTES.SHOP} children="Магазин" />
        </div>
      </div>
      <div className="menu-part">
        <button className="btn-auth" onClick={onBtnClickAuth}>
          <img src={icons8_user_96} alt="btn-login" />
          <p>Увійти</p>
        </button>
        <button className="btn-auth">
          <img src={icon_heart_empty_black} alt="btn-like" />
          <p>Улюблене</p>
        </button>
        <button className="btn-auth" onClick={onBtnClickBasket}>
          <img src={shopping_bag_color} alt="btn-basket" />
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
