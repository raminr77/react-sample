import { clsx } from 'clsx';

import { animator } from '@/shared/helpers';

export function AppReduxLoader() {
  return (
    <div
      className={clsx(
        'w-full h-dvh flex items-center justify-center bg-white',
        animator({ name: 'fadeIn' })
      )}
    >
      <h3>Preparing application data...</h3>
    </div>
  );
}
