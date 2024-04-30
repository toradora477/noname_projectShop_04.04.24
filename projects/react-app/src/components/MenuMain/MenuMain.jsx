import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../common_constants/routes';
import { AUTH } from '../../common_constants/modals';
import { setModal } from '../../store/commonReducer';
import { FlexBox } from '../';
import { logo_menu_component, icon_user_black, icon_heart_empty_black, shopping_bag_color_green_gradient } from '../../images';
import './MenuMain.scss';

const MenuMain = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.common.basket) ?? [];
  const userAuth = useSelector((state) => state.common.userAuth);

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
              <img src={icon_user_black} alt="btn-login" />
              &nbsp;&nbsp;
              <p>{testDynamicForLogin}</p>
            </FlexBox>
          </button>
          &nbsp;&nbsp;
          <Link className="btn-auth" to={ROUTES.PERSONAL_OFFICE}>
            <FlexBox>
              <img src={icon_heart_empty_black} alt="btn-like" />
              &nbsp;&nbsp;
              <p>Улюблене</p>
            </FlexBox>
          </Link>
          &nbsp;&nbsp;
          <Link className="btn-auth" to={ROUTES.PERSONAL_OFFICE}>
            <img src={shopping_bag_color_green_gradient} alt="btn-basket" />
            {basket?.length || null}
          </Link>
        </div>
      </FlexBox>
    </header>
  );
};

export default MenuMain;
