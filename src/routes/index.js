/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
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
    // eslint-disable-next-line react/jsx-filename-extension
    <Router>
      <ScrollToTop />
      <Switch>
        {PAGE_ROUTES.map((routeData) =>
          routeData.isPrivate || routeData.deactivate ? (
            <PrivateRoute key={routeData.id} {...routeData} />
          ) : (
            <Route key={routeData.id} {...routeData} />
          )
        )}
        <Route path={NOT_FOUND_ROUTE} element={<NotFoundPage />} />
        <Route path='*' element={<Navigate to={NOT_FOUND_ROUTE} />} />
      </Switch>
    </Router>
  );
}
