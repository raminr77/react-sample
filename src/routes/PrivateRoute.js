/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

import { userSelectors } from 'store/user/userSelectors';
import { NOT_FOUND_ROUTE, USER_LOGIN_ROUTE } from 'routes/RedirectRoutes';

export function PrivateRoute({ element: Component, deactivate = false, ...rest }) {
  const { isAuthenticated } = useSelector(userSelectors.userInfo);
  if (deactivate) {
    // eslint-disable-next-line react/jsx-filename-extension
    return <Route {...rest} element={<Navigate to={NOT_FOUND_ROUTE} />} />;
  }
  return (
    <Route
      {...rest}
      // eslint-disable-next-line react/no-unstable-nested-components
      element={(properties) =>
        isAuthenticated ? (
          <Component {...properties} />
        ) : (
          <Navigate to={USER_LOGIN_ROUTE} />
        )
      }
    />
  );
}
