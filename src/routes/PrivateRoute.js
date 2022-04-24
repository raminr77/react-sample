import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import { USER_LOGIN_ROUTE } from 'routes/RedirectRoutes';

export const PrivateRoute = ({ isAuthenticated = false, element: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      element={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to={USER_LOGIN_ROUTE} />
      }
    />
  );
};
