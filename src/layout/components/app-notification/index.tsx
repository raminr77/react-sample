import { useRef, useState } from 'react';
import { clsx } from 'clsx';

import { requestNotificationPermission, onMessageListener } from '@/shared/libs/firebase';
import { animator, toast } from '@/shared/helpers';

export function AppNotification() {
  const isFirstLoad = useRef<boolean>(true);
  // UI of this component skipped (For showing this UI change it to FALSE)
  const [hidePermissionBanner, sethidePermissionBanner] = useState<boolean>(true);

  const handleUserAction = (approve = false) => {
    if (approve) {
      requestNotificationPermission();
    }
    sethidePermissionBanner(true);
  };

  if (isFirstLoad.current) {
    requestNotificationPermission().then((token) => {
      if (token) {
        sethidePermissionBanner(true);
      }
    });

    onMessageListener().then(() => {
      toast.info({ message: 'You have a new message!' });
    });

    isFirstLoad.current = false;
  }

  if (hidePermissionBanner) {
    return null;
  }

  return (
    <div
      className={clsx(
        'w-full h-dvh fixed top-0 left-0 z-50 bg-white/90 select-none flex items-center justify-center flex-col gap-4',
        animator({ name: 'fadeIn' })
      )}
    >
      <span>Allow to enable notifications?</span>
      <div className='flex items-center justify-center gap-3 mt-2'>
        <button className='w-full' onClick={() => handleUserAction(false)}>
          No
        </button>
        <button className='w-full' onClick={() => handleUserAction(true)}>
          Yes
        </button>
      </div>
    </div>
  );
}
