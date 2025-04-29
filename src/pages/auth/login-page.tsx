import { Link, Navigate, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { clsx } from 'clsx';

import { userSelectors } from '@/shared/store/features/user/user-selectors.ts';
import { loginAction } from '@/shared/store/features/user/user-slices';
import { LoginQuery } from '@/shared/services/user-api/types';
import { useLoginMutation } from '@/shared/services/user-api';
import { APP_DATA, APP_ROUTES } from '@/shared/constants';
import { animator, toast } from '@/shared/helpers';

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginRequest, { isLoading }] = useLoginMutation();
  const { isAuthenticated } = useSelector(userSelectors.userInfo);

  if (isAuthenticated) {
    return <Navigate to={APP_ROUTES.main} replace />;
  }

  const { register, handleSubmit } = useForm<LoginQuery>({
    defaultValues: {
      username: 'admin',
      password: 'admin'
    }
  });

  const handleLogin = (formValues: LoginQuery) => {
    loginRequest(formValues)
      .unwrap()
      .then(() => {
        dispatch(loginAction());
        navigate(APP_ROUTES.main);
        toast.success({
          message: `Welcome to ${APP_DATA.name}`
        });
      })
      .catch(() =>
        toast.error({
          message: 'Login failed'
        })
      );
  };

  return (
    <div className='w-full flex flex-col gap-3 text-center items-center justify-center'>
      <form
        onSubmit={handleSubmit(handleLogin)}
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
          {...register('username')}
          placeholder='Username'
          type='text'
        />
        <input
          className='border rounded px-4 py-2'
          {...register('password')}
          placeholder='Password'
          type='password'
        />

        <button
          className='mt-1 border py-3 px-4 rounded w-full'
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>

        <Link to={APP_ROUTES.landing}>[ Return Home ]</Link>
      </form>
    </div>
  );
}
