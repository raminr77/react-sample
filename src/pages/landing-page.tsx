import { Link, Navigate } from 'react-router';
import { useSelector } from 'react-redux';

import { userSelectors } from '@/shared/store/features/user/user-selectors';
import { APP_ROUTES } from '@/shared/constants';

export function LandingPage() {
  const { isAuthenticated } = useSelector(userSelectors.userInfo);

  if (isAuthenticated) {
    return <Navigate to={APP_ROUTES.main} replace />;
  }

  return (
    <main className='flex flex-col items-center justify-center h-dvh gap-6'>
      <h3>Landing Page</h3>
      <div className='flex items-center justify-center gap-4 flex-wrap'>
        <Link className='border py-3 px-4 rounded' to={APP_ROUTES.login}>
          Login Sample
        </Link>
        <Link className='border py-3 px-4 rounded' to={APP_ROUTES.main}>
          Protected Route
        </Link>
        <Link className='border py-3 px-4 rounded' to={APP_ROUTES.notFound}>
          Not Found Page
        </Link>
      </div>
    </main>
  );
}
