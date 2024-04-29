import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../common_constants/routes';
import { BASKET_OF_GOODS, AUTH } from '../../common_constants/modals';
import { setModal } from '../../store/commonReducer';
import { FlexBox } from '../';
import { request } from '../../tools';
import { logo_menu_component, icons8_user_96, icon_heart_empty_black, shopping_bag_color } from '../../images';
import './MenuMain.scss';

const MenuMain = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.common.basket) ?? [];
  const userAuth = useSelector((state) => state.common.userAuth);


  const onBtnClickBasket = () => {
    dispatch(setModal({ name: BASKET_OF_GOODS }));
  };

  const onBtnClickAuth = () => {
    dispatch(setModal({ name: AUTH }));
  };

  const logout = () => {
    window.localStorage.removeItem('accessToken');
    window.location.reload();
  };

  const testDynamicForLogin = userAuth ? 'Вийти' : 'Увійти';
  const btnDynamicForLogin = userAuth ? logout : onBtnClickAuth;

  return (
    <header className="menu-main">
      <Link className="company-logo" to={ROUTES.HOME_DASHBOARD}>
        <img src={logo_menu_component} alt="Company Logo" />
      </Link>
      <FlexBox className="group-links">
        <div className="menu-part">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div className="links">
            <Link className="links-item" to={ROUTES.HOME_DASHBOARD} children="Головна" />
            &nbsp;&nbsp;
            <Link className="links-item" to={ROUTES.SHOP} children="Магазин" />
          </div>
        </div>
        <div className="menu-part">
          <button className="btn-auth" onClick={btnDynamicForLogin}>
            <FlexBox>
              <img src={icons8_user_96} alt="btn-login" />
              &nbsp;&nbsp;
              <p>{testDynamicForLogin}</p>
            </FlexBox>
          </button>
          &nbsp;&nbsp;
          <button className="btn-auth" onClick={onBtnClickAuth}>
            <FlexBox>
              <img src={icon_heart_empty_black} alt="btn-like" />
              &nbsp;&nbsp;
              <p>Улюблене</p>
            </FlexBox>
          </button>
          &nbsp;&nbsp;
          <button className="btn-auth" onClick={onBtnClickBasket}>
            <img src={shopping_bag_color} alt="btn-basket" />
            {basket?.length || null}
          </button>
        </div>
      </FlexBox>
    </header>
  );
};

export default MenuMain;
