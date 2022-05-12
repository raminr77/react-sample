import React from 'react';
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
      // your api data
      age: 24, // remove on inputTransformer
      name: 'ramin'
    }
    // onError: (error) => console.log('PAGE ERROR:', error),
    // onSuccess: (response) => console.log('PAGE RESULT:', response)
  });

  return (
    <div dir='ltr' className='flex flex-col items-center'>
      <h1 className='font-extrabold text-3xl my-5'>Index Page</h1>
      {/* For reCall API */}
      <button className='bg-green-600 text-gray-50 px-3 py-2 rounded-md' onClick={reload}>
        Reload
      </button>
      {pending && <div className='w-full my-4 text-center text-cyan-700'>LOADING ...</div>}
      <ul className='mx-auto max-w-xl mt-5'>
        {Array.isArray(data) &&
          data?.map((item, index) => (
            <li key={index} className='mb-4 bg-gray-200 p-5 rounded-lg'>
              <h3 className='mb-1 font-bold'>{item.title}</h3>
              <p className='text-justify'>{item.description}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};
