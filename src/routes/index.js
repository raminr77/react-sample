import React from 'react';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';

import { PAGE_ROUTES } from 'routes/PageRoutes';
import { PrivateRoute } from 'routes/PrivateRoute';

export const Routes = () => {
  return (
    <Router>
      <Switch>
        {PAGE_ROUTES.map((routeData, index) =>
          routeData.isPrivate ? (
            <PrivateRoute key={index} {...routeData} />
          ) : (
            <Route key={index} {...routeData} />
          )
        )}
      </Switch>
    </Router>
  );
};
