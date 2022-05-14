import React from 'react';
import { useAPI } from 'hooks/useApi';
import { usePageData } from 'hooks/usePageData';
import { getIndexPageData } from 'api/indexPage';

export const IndexPage = () => {
  // usePageData Example
  const { data, reload, pending } = usePageData({
    apiMethod: getIndexPageData,
    disabled: false,
    dataCached: true,
    expireTime: 5000,
    apiData: {
      // ... your API data
      name: 'ramin',
      age: 24 // example: remove on inputTransformer
    }
    // onError: (error) => console.log('PAGE ERROR:', error),
    // onSuccess: (response) => console.log('PAGE RESULT:', response)
  });

  // useAPI Example
  const { request, pending: loading } = useAPI({
    apiMethod: getIndexPageData,
    requestDataOnLoad: { name: 'ramin' }
    // onError: (error) => console.log('API ERROR:', error),
    // onSuccess: (response) => console.log('API RESULT:', response)
  });

  const apiRequest = () => {
    request();
  };

  return (
    <div dir='ltr' className='flex flex-col items-center'>
      <h1 className='font-extrabold text-3xl my-5 animate__animated animate__bounce'>Index Page</h1>

      {/* For reCall & call API */}
      <div className='flex items-center gap-x-4'>
        <button className='bg-green-600 text-gray-50 px-3 py-2 rounded-md' onClick={reload}>
          Reload API
        </button>
        <button className='bg-cyan-600 text-gray-50 px-3 py-2 rounded-md' onClick={apiRequest}>
          API Request
        </button>
      </div>

      {(pending || loading) && (
        <div className='w-full my-4 text-center mt-9 text-cyan-700'>LOADING ...</div>
      )}

      <ul className='mx-auto max-w-xl mt-5'>
        {Array.isArray(data) &&
          data?.map((item, index) => (
            <li key={index} className='mb-4 bg-gray-100 p-5 rounded-lg'>
              <h3 className='mb-1 font-bold'>{item.title}</h3>
              <p className='text-justify'>{item.description}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};
