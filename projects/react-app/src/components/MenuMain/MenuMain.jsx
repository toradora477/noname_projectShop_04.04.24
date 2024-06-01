import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../common_constants/routes';
import { AUTH } from '../../common_constants/modals';
import { NAME_SELECT } from '../../common_constants/business';
import { setModal } from '../../store/commonReducer';
import { FlexBox } from '../';
import { logo_menu_component, icon_user_black, icon_heart_empty_black, shopping_bag_baskets_main } from '../../images';
import './MenuMain.scss';
import { PrimaryButton, Typography } from '../';

const MenuMain = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.common.basket) ?? [];
  const userAuth = useSelector((state) => state.common.userAuth);
  const { isAdmin, isClientOrAbove, isGuest, isNotAdmin, isClientOrLower } = useSelector((state) => state.common.accessRoles);

  const Text = ({ children, mt }) => <Typography children={children} mt={mt} sz={14} fw={500} />;

  const onBtnClickAuth = () => {
    dispatch(setModal({ name: AUTH }));
  };

  const logout = () => {
    window.localStorage.removeItem('accessToken');
    window.location.reload();
  };

  const MenuAdmin = () => (
    <div className="menu-admin">
      <Link className="menu-admin-btn" to={ROUTES.ORDER_ADMIN}>
        <PrimaryButton children="Замовлення" color="gradient_main" />
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link className="menu-admin-btn" to={ROUTES.PRODUCTS_ADMIN}>
        <PrimaryButton children="Товари" color="gradient_main" />
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  );

  const BtnLike = () => (
    <FlexBox>
      <img src={icon_heart_empty_black} alt="btn-like" />
      &nbsp;
      <Text>Улюблене</Text>
    </FlexBox>
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

        {isAdmin && <MenuAdmin />}

        <div className="menu-part">
          <div className="btn-auth text-link">
            <FlexBox>
              {isClientOrAbove ? (
                <Link to={{ pathname: ROUTES.PERSONAL_OFFICE, state: { selectParam: NAME_SELECT.ACCOUNT } }}>
                  <img src={icon_user_black} alt="btn-login" />
                </Link>
              ) : (
                <button name="login in and login out" className="btn-auth" style={{ padding: 0 }} onClick={userAuth ? logout : onBtnClickAuth}>
                  {!isClientOrAbove && <img src={icon_user_black} alt="btn-login" />}
                </button>
              )}

              <button name="login in and login out" className="btn-auth" onClick={userAuth ? logout : onBtnClickAuth}>
                <Text>{userAuth ? 'Вийти' : 'Увійти'}</Text>
              </button>
            </FlexBox>
          </div>
          &nbsp;&nbsp;
          {isClientOrLower &&
            (isGuest ? (
              <button className="btn-auth text-link" onClick={onBtnClickAuth}>
                <BtnLike />
              </button>
            ) : (
              <Link className="btn-auth text-link" to={{ pathname: ROUTES.PERSONAL_OFFICE, state: { selectParam: NAME_SELECT.WISHLIST } }}>
                <BtnLike />
              </Link>
            ))}
          &nbsp;&nbsp;
          {isNotAdmin && (
            <Link className="btn-auth basket-icon" to={{ pathname: ROUTES.PERSONAL_OFFICE, state: { selectParam: NAME_SELECT.BASKETLIST } }}>
              <img src={shopping_bag_baskets_main} alt="btn-basket" />
              {basket?.length > 0 && <span className="basket-count">{basket.length}</span>}
            </Link>
          )}
        </div>
      </FlexBox>
    </header>
  );
};

export default MenuMain;
