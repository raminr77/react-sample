import { APP_ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { Link } from 'react-router';
import { clsx } from 'clsx';

export function NotFoundPage() {
  return (
    <main
      className={clsx(
        'w-full h-dvh flex items-center justify-center gap-4 flex-col',
        animator({ name: 'fadeIn', speed: 'faster' })
      )}
    >
      <h3>404 | Not Found Page</h3>
      <Link to={APP_ROUTES.landing}>Return Home</Link>
    </main>
  );
}
