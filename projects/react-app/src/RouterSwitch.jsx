import { ROUTES } from './common_constants/routes';
import { Route, Switch } from 'react-router-dom';

// import Auth from './pages/Auth';
import HomeDashboard from './pages/HomeDashboard';

export default function RouterSwitch() {
  return (
    <Switch>
      {/* <Route exact path={ROUTES.AUTH}>
        <Auth />
      </Route> */}

      <>
        <Route exact path={ROUTES.HOME_DASHBOARD}>
          <HomeDashboard />
        </Route>
      </>
    </Switch>
  );
}
