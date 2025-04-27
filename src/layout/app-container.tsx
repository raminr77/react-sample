import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import type { ReactNode } from 'react';
import { clsx } from 'clsx';

import { userSelectors } from '@/shared/store/features/user/user-selectors';
import { APP_ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';

import { AppNotification } from './components/app-notification';

interface AppContainerProps {
  isPrivate: boolean;
  children: ReactNode;
}

export function AppContainer({ isPrivate, children }: AppContainerProps) {
  const { isAuthenticated } = useSelector(userSelectors.userInfo);

  if (isPrivate && !isAuthenticated) {
    return <Navigate to={APP_ROUTES.login} replace />;
  }

  return (
    <div
      className={clsx(
        'w-full flex flex-col relative select-none overflow-x-hidden items-center',
        animator({ name: 'fadeIn' })
      )}
    >
      <AppNotification />

      <div className='w-full px-5 z-0 min-md:max-w-xl'>{children}</div>
    </div>
  );
}
