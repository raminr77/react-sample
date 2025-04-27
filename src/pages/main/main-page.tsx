import { useDispatch } from 'react-redux';

import { logoutAction } from '@/shared/store/features/user/user-slices';

export function MainPage() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <main className='flex w-full flex-col items-center justify-center h-dvh gap-6'>
      <h3>Main Page ( Protected )</h3>
      <button className='border py-3 px-4 rounded' onClick={handleLogout}>
        Logout
      </button>
    </main>
  );
}
