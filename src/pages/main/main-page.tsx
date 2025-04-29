import { useDispatch } from 'react-redux';

import { logoutAction } from '@/shared/store/features/user/user-slices';
import { useGetMainQuery } from '@/shared/services/main-api';
import { APP_ROUTES } from '@/shared/constants';
import { Link } from 'react-router';

export function MainPage() {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetMainQuery();

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <main className='flex w-full flex-col items-center justify-center h-dvh gap-6'>
      <h3 className='flex gap-1'>
        Main Page <span className='text-red-500'>( Protected )</span>
      </h3>
      <button className='border py-3 px-4 rounded' onClick={handleLogout}>
        Logout
      </button>
      <Link to={APP_ROUTES.landing}>[ Return Home ]</Link>

      {isFetching && <p>Loading...</p>}
      {data && (
        <div className='w-full flex flex-col gap-2'>
          <div className='w-full border-b py-2 px-4 flex items-center justify-between mb-4'>
            <span>Name</span>
            <span>Age</span>
          </div>

          {data.data.map((item) => (
            <div
              key={item.id}
              className='w-full border py-2 px-4 rounded flex items-center justify-between'
            >
              <span>{item.name}</span>
              <span>{item.age}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
