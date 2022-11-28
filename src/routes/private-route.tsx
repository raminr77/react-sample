/* eslint-disable react/jsx-props-no-spreading, react/no-unstable-nested-components, @typescript-eslint/ban-ts-comment */
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

import { userSelectors } from 'store/user/user-selectors';
import { NOT_FOUND_ROUTE, USER_LOGIN_ROUTE } from 'routes/route-path';

interface Properties {
  deactivate: boolean;
  element: ReactNode;
  path: string;
}

export function PrivateRoute({
  path,
  element: Component,
  deactivate = false
}: Properties) {
  const { isAuthenticated } = useSelector(userSelectors.userInfo);

  if (deactivate) {
    return <Route path={path} element={<Navigate to={NOT_FOUND_ROUTE} />} />;
  }

  return (
    <Route
      path={path}
      // @ts-ignore: Unreachable code error
      element={(properties) =>
        isAuthenticated ? (
          // @ts-ignore: Unreachable code error
          <Component {...properties} />
        ) : (
          <Navigate to={USER_LOGIN_ROUTE} />
        )
      }
    />
  );
}
