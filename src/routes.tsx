import { BrowserRouter, Routes as ReactRoutes, Route, useLocation } from 'react-router';

import { AppContainer } from '@/layout/app-container';
import { AuthLayout } from '@/layout/auth-layout';
import { APP_ROUTES } from '@/shared/constants';

import { NotFoundPage } from '@/pages/not-found-page';
import { LoginPage } from '@/pages/auth/login-page';
import { LandingPage } from '@/pages/landing-page';
import { MainPage } from '@/pages/main/main-page';
import { useEffect } from 'react';

const ROUTES_DATA = [
  {
    isPrivate: true,
    element: <MainPage />,
    path: APP_ROUTES.main
  }
] as const;

export function Routes() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route index path={APP_ROUTES.landing} element={<LandingPage />} />

        {/* Auth Sample */}
        <Route element={<AuthLayout />}>
          <Route path={APP_ROUTES.login} element={<LoginPage />} />
        </Route>

        {ROUTES_DATA.map(({ path, element, isPrivate }) => (
          <Route
            key={path}
            path={path}
            element={<AppContainer isPrivate={isPrivate}>{element}</AppContainer>}
          />
        ))}

        {/* Not Found */}
        <Route path={APP_ROUTES.notFound} element={<NotFoundPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </ReactRoutes>
    </BrowserRouter>
  );
}
