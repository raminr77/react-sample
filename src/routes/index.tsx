import {
  Route,
  Navigate,
  Routes as Switch,
  BrowserRouter as Router
} from 'react-router-dom';

import { NotFoundPage } from 'pages/404';
import { PAGE_ROUTES } from 'routes/page-routes';
import { ScrollToTop } from 'routes/scroll-to-top';
import { PrivateRoute } from 'routes/private-route';
import { NOT_FOUND_ROUTE } from 'routes/route-path';

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
