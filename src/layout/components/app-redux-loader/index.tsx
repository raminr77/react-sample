import { clsx } from 'clsx';

import { animator } from '@/shared/helpers';

export function AppReduxLoader() {
  return (
    <div
      className={clsx(
        'w-full h-dvh fixed top-0 left-0 z-50 bg-white/20 backdrop-blur-sm select-none flex items-center justify-center flex-col gap-4',
        animator({ name: 'fadeIn' })
      )}
    >
      <h3>Preparing application data...</h3>
    </div>
  );
}
