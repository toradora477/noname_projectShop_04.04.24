import React from 'react';
import { useSelector } from 'react-redux';
import { ROUTES } from '../common_constants/routes';
import { Route, Switch } from 'react-router-dom';
import { ROLES } from '../common_constants/business';

import HomeDashboard from '../pages/HomeDashboard';
import Shop from '../pages/Shop';
import Error404 from '../pages/Error404';
import OrderAdmin from '../pages/OrderAdmin';
import ProductsAdmin from '../pages/ProductsAdmin';
import CardProduct from '../pages/CardProduct/CardProduct.jsx';
import StatisticsAdmin from '../pages/StatisticsAdmin';
import PersonalOffice from '../pages/PersonalOffice';

const RouterSwitch = () => {
  const userAuth = useSelector((state) => state.common.userAuth),
    { role = 'guest' } = userAuth,
    isAdmin = ROLES[role] === ROLES.admin;

  return (
    <Switch>
      {isAdmin && <Route exact path={ROUTES.ORDER_ADMIN} component={OrderAdmin} />}
      {isAdmin && <Route exact path={ROUTES.PRODUCTS_ADMIN} component={ProductsAdmin} />}
      {isAdmin && <Route exact path={ROUTES.STATISTICS_ADMIN} component={StatisticsAdmin} />}

      <Route exact path={ROUTES.HOME_DASHBOARD} component={HomeDashboard} />
      <Route exact path={ROUTES.PERSONAL_OFFICE} component={PersonalOffice} />
      <Route exact path={ROUTES.SHOP} component={Shop} />
      <Route exact path={`${ROUTES.CARD_PRODUCT}/:productId`} component={CardProduct} />
      <Route exact path={ROUTES.ERROR404} component={Error404} />

      <Route component={Error404} />
    </Switch>
  );
};

export default RouterSwitch;
