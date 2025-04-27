import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { clsx } from 'clsx';

import { loginAction } from '@/shared/store/features/user/user-slices';
import { APP_DATA, APP_ROUTES } from '@/shared/constants';
import { animator, toast } from '@/shared/helpers';

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginAction());
    navigate(APP_ROUTES.main);
    toast.success({
      message: `Welcome to ${APP_DATA.name}`
    });
  };

  return (
    <div className='w-full flex flex-col gap-3 text-center items-center justify-center'>
      <div
        className={clsx(
          'flex flex-col w-full gap-3 border p-5 rounded max-w-md',
          animator({ name: 'fadeIn' })
        )}
      >
        <h3 className={clsx('text-lg mb-2', animator({ name: 'fadeInUp' }))}>
          {`Sign in to ${APP_DATA.name}`}
        </h3>

        <input
          className='border rounded px-4 py-2'
          placeholder='Username'
          value='Admin'
        />
        <input
          className='border rounded px-4 py-2'
          placeholder='Password'
          type='password'
          value='admin'
        />

        <button className='mt-1 border py-3 px-4 rounded w-full' onClick={handleLogin}>
          Login
        </button>

        <Link to={APP_ROUTES.landing}>Return Home</Link>
      </div>
    </div>
  );
}
