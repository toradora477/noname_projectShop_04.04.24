import { ROUTES } from '../common_constants/routes';
import { Route, Switch } from 'react-router-dom';

import HomeDashboard from '../pages/HomeDashboard';
import Shop from '../pages/Shop';
import Error404 from '../pages/Error404';
import OrderAdmin from '../pages/OrderAdmin';
import ProductsAdmin from '../pages/ProductsAdmin';
import CardProduct from '../pages/CardProduct/CardProduct.jsx';
import StatisticsAdmin from '../pages/StatisticsAdmin';

export default function RouterSwitch() {
  return (
    <Switch>
      <Route exact path={ROUTES.HOME_DASHBOARD} component={HomeDashboard} />
      <Route exact path={ROUTES.SHOP} component={Shop} />
      <Route exact path={ROUTES.ORDER_ADMIN} component={OrderAdmin} />
      <Route exact path={ROUTES.PRODUCTS_ADMIN} component={ProductsAdmin} />
      <Route exact path={`${ROUTES.CARD_PRODUCT}/:productId`} component={CardProduct} />
      <Route exact path={ROUTES.STATISTICS_ADMIN} component={StatisticsAdmin} />
      <Route exact path={ROUTES.ERROR404} component={Error404} />
      <Route component={Error404} />
    </Switch>
  );
}
