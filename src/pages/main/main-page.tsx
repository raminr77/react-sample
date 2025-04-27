import { useDispatch } from 'react-redux';

import { logoutAction } from '@/shared/store/features/user/user-slices';
import { useGetMainQuery } from '@/shared/services/main-api';

export function MainPage() {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetMainQuery();

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <main className='flex w-full flex-col items-center justify-center h-dvh gap-6'>
      <h3>Main Page ( Protected )</h3>
      <button className='border py-3 px-4 rounded' onClick={handleLogout}>
        Logout
      </button>

      {isFetching && <p>Loading...</p>}
      {data && (
        <div className='flex flex-col gap-2'>
          <div className='border-b py-2 px-4 flex items-center justify-between mb-4'>
            <span>Name</span>
            <span>Age</span>
          </div>

          {data.data.map((item) => (
            <div
              key={item.id}
              className='border py-2 px-4 rounded flex items-center justify-between'
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
