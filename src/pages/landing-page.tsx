import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { userSelectors } from '@/shared/store/features/user/user-selectors';
import { logoutAction } from '@/shared/store/features/user/user-slices';
import { APP_ROUTES } from '@/shared/constants';

export function LandingPage() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(userSelectors.userInfo);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <main className='flex flex-col items-center justify-center h-dvh gap-6'>
      <h3 className='text-2xl'>React Sample Landing Page</h3>
      {isAuthenticated && <p className='text-slate-400'>You Are Logged In Now</p>}
      <div className='flex items-center justify-center gap-4 flex-wrap'>
        {isAuthenticated ? (
          <button className='border py-3 px-4 rounded' onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link className='border py-3 px-4 rounded' to={APP_ROUTES.login}>
            Login Page
          </Link>
        )}

        <Link className='flex gap-2 border py-3 px-4 rounded' to={APP_ROUTES.main}>
          Main Page
          {isAuthenticated ? (
            <span className='text-green-500'>( Allowed )</span>
          ) : (
            <span className='text-red-500'>( Protected )</span>
          )}
        </Link>

        <Link className='border py-3 px-4 rounded' to={APP_ROUTES.notFound}>
          Not Found Page
        </Link>
      </div>
    </main>
  );
}
