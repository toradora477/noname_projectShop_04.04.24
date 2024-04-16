import { ROUTES } from './common_constants/routes';
import { Route, Switch } from 'react-router-dom';

import HomeDashboard from './pages/HomeDashboard';
import Shop from './pages/Shop';
import Error404 from './pages/Error404';

export default function RouterSwitch() {
  const routersError = (
    <>
      <Route exact path={ROUTES.ERROR404} component={Error404} />
      <Route component={Error404} />
    </>
  );

  return (
    <Switch>
      <Route exact path={ROUTES.HOME_DASHBOARD} children={<HomeDashboard />} />
      <Route exact path={ROUTES.SHOP} children={<Shop />} />
      {routersError}
    </Switch>
  );
}
