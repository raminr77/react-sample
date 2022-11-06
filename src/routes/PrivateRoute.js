import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

import { userSelectors } from 'store/user/userSelectors';
import { NOT_FOUND_ROUTE, USER_LOGIN_ROUTE } from 'routes/RedirectRoutes';

export function PrivateRoute({ element: Component, deactivate = false, path }) {
  const { isAuthenticated } = useSelector(userSelectors.userInfo);
  if (deactivate) {
    // eslint-disable-next-line react/jsx-filename-extension
    return <Route path={path} element={<Navigate to={NOT_FOUND_ROUTE} />} />;
  }
  return (
    <Route
      path={path}
      // eslint-disable-next-line react/no-unstable-nested-components
      element={(properties) =>
        isAuthenticated ? (
          /* eslint-disable react/jsx-props-no-spreading */
          <Component {...properties} />
        ) : (
          <Navigate to={USER_LOGIN_ROUTE} />
        )
      }
    />
  );
}
