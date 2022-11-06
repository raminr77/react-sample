import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate
} from 'react-router-dom';

import { NotFoundPage } from 'pages/404';
import ScrollToTop from 'routes/ScrollToTop';
import { PAGE_ROUTES } from 'routes/PageRoutes';
import { PrivateRoute } from 'routes/PrivateRoute';
import { NOT_FOUND_ROUTE } from 'routes/RedirectRoutes';

export function Routes() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        {PAGE_ROUTES.map(({ id, isPrivate, deactivate, path, element }) =>
          isPrivate || deactivate ? (
            <PrivateRoute
              key={id}
              path={path}
              element={element}
              deactivate={deactivate}
            />
          ) : (
            <Route key={id} path={path} element={element} />
          )
        )}
        <Route path={NOT_FOUND_ROUTE} element={<NotFoundPage />} />
        <Route path='*' element={<Navigate to={NOT_FOUND_ROUTE} />} />
      </Switch>
    </Router>
  );
}
