import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

import { userSelectors } from 'store/user/userSelectors';
import { NOT_FOUND_ROUTE, USER_LOGIN_ROUTE } from 'routes/RedirectRoutes';

export const PrivateRoute = ({ element: Component, deactivate = false, ...rest }) => {
  const { isAuthenticated } = useSelector(userSelectors.userInfo);
  if (deactivate) {
    return <Route {...rest} element={<Navigate to={NOT_FOUND_ROUTE} />} />;
  }
  return (
    <Route
      {...rest}
      element={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to={USER_LOGIN_ROUTE} />
      }
    />
  );
};
