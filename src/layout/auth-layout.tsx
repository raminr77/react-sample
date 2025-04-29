import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';

import { userSelectors } from '@/shared/store/features/user/user-selectors';
import { APP_ROUTES } from '@/shared/constants';

export function AuthLayout() {
  const { isAuthenticated } = useSelector(userSelectors.userInfo);

  if (isAuthenticated) {
    return <Navigate to={APP_ROUTES.main} replace />;
  }

  return (
    <div className='w-full h-dvh flex items-center justify-center p-5'>
      <Outlet />
    </div>
  );
}
