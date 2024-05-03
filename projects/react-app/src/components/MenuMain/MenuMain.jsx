import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../common_constants/routes';
import { AUTH } from '../../common_constants/modals';
import { NAME_SELECT, ROLES } from '../../common_constants/business';
import { setModal } from '../../store/commonReducer';
import { FlexBox } from '../';
import { logo_menu_component, icon_user_black, icon_heart_empty_black, shopping_bag_color_green_gradient } from '../../images';
import './MenuMain.scss';
import { PrimaryButton } from '../';

const MenuMain = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.common.basket) ?? [];
  const userAuth = useSelector((state) => state.common.userAuth),
    { role = 'guest' } = userAuth,
    isClientOrAbove = ROLES[role] <= ROLES.client,
    isAdmin = ROLES[role] === ROLES.admin;

  const onBtnClickAuth = () => {
    dispatch(setModal({ name: AUTH }));
  };

  const logout = () => {
    window.localStorage.removeItem('accessToken');
    window.location.reload();
  };

  const testDynamicForLogin = userAuth ? 'Вийти' : 'Увійти';
  const btnDynamicForLogin = userAuth ? logout : onBtnClickAuth;

  const menuAdmin = (
    <div className="menu-admin">
      <Link className="menu-admin-btn" to={ROUTES.ORDER_ADMIN}>
        <PrimaryButton children="Замовлення" color="gradient_main" />
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link className="menu-admin-btn" to={ROUTES.PRODUCTS_ADMIN}>
        <PrimaryButton children="Товари" color="gradient_main" />
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link className="menu-admin-btn" to={ROUTES.STATISTICS_ADMIN}>
        <PrimaryButton children="Статистика" color="gradient_main" />
      </Link>
    </div>
  );

  return (
    <header className="menu-main">
      <Link className="company-logo" to={ROUTES.HOME_DASHBOARD}>
        <img src={logo_menu_component} alt="Company Logo" />
      </Link>
      <FlexBox mt={0} className="group-links">
        <div className="menu-part">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div className="links">
            <Link className="links-item" to={ROUTES.HOME_DASHBOARD} children="Головна" />
            &nbsp;&nbsp;
            <Link className="links-item" to={ROUTES.SHOP} children="Магазин" />
          </div>
        </div>

        {isAdmin && menuAdmin}

        <div className="menu-part">
          <div className="btn-auth">
            <FlexBox>
              {isClientOrAbove && (
                <Link to={{ pathname: ROUTES.PERSONAL_OFFICE, state: { selectParam: NAME_SELECT.ACCOUNT } }}>
                  <img src={icon_user_black} alt="btn-login" />
                </Link>
              )}

              <button className="btn-auth" onClick={btnDynamicForLogin}>
                <FlexBox>
                  {!isClientOrAbove && <img src={icon_user_black} alt="btn-login" />}
                  <p>{testDynamicForLogin}</p>
                </FlexBox>
              </button>
            </FlexBox>
          </div>
          &nbsp;&nbsp;
          <Link className="btn-auth text-link" to={{ pathname: ROUTES.PERSONAL_OFFICE, state: { selectParam: NAME_SELECT.WISHLIST } }}>
            <FlexBox>
              <img src={icon_heart_empty_black} alt="btn-like" />
              &nbsp;
              <p>Улюблене</p>
            </FlexBox>
          </Link>
          &nbsp;&nbsp;
          <Link className="btn-auth" to={{ pathname: ROUTES.PERSONAL_OFFICE, state: { selectParam: NAME_SELECT.BASKETLIST } }}>
            <img src={shopping_bag_color_green_gradient} alt="btn-basket" />
            {basket?.length || null}
          </Link>
        </div>
      </FlexBox>
    </header>
  );
};

export default MenuMain;
