import React, { useState } from 'react';
import { useAPI } from 'hooks/useApi';
import { usePageData } from 'hooks/usePageData';
import { getIndexPageData } from 'api/indexPage';

export const IndexPage = () => {
  const [data, setData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  // usePageData Example
  const { reload, pending } = usePageData({
    apiMethod: getIndexPageData,
    disabled: false,
    dataCached: true,
    expireTime: 5000,
    apiData: {
      // ... your API data
      albumId: 1,
      name: 'ramin' // example: remove on inputTransformer
    },
    onSuccess: (response) => setData(response)
    // onError: (error) => console.log('PAGE ERROR:', error),
  });

  // useAPI Example
  const { request, pending: loading } = useAPI({
    apiMethod: getIndexPageData,
    requestDataOnLoad: { albumId: 2 },
    onSuccess: (response) => setData([...data, ...response])
    // onError: (error) => console.log('API ERROR:', error),
  });

  const apiRequest = () => request();
  const showMoreData = () => setShowMore(true);

  return (
    <div dir='ltr' className='flex flex-col items-center'>
      <h1 className='font-extrabold text-3xl my-5 animate__animated animate__bounce'>Index Page</h1>

      {/* For reCall & call API */}
      <div className='flex items-center gap-x-4'>
        <button className='bg-green-600 text-gray-50 px-3 py-2 rounded-md' onClick={reload}>
          Load Request API (albumId = 1)
        </button>
        <button className='bg-cyan-600 text-gray-50 px-3 py-2 rounded-md' onClick={apiRequest}>
          Other API Request (albumId = 2)
        </button>
      </div>

      {pending && <div className='w-full my-4 text-center mt-9 text-cyan-700'>LOADING ...</div>}

      <ul className='mx-auto max-w-xl mt-5'>
        {Array.isArray(data) &&
          data?.slice(0, showMore ? data?.length : 3)?.map((item, index) => (
            <li key={index} className='flex items-start mb-4 bg-gray-100 p-5 rounded-lg'>
              <img className='mr-4 rounded' width={120} src={item.url} />
              <div className='pt-4'>
                <h3 className='mb-1 font-bold'>
                  {index + 1} - {item.title}
                </h3>
                <p className='text-cyan-600 font-bold'>Album Name: {item.album}</p>
              </div>
            </li>
          ))}
      </ul>

      {loading && <div className='w-full my-4 text-center mt-9 text-cyan-700'>LOADING ...</div>}

      {!showMore && data?.length > 0 && (
        <button
          onClick={showMoreData}
          className='bg-gray-600 mb-10 text-gray-50 px-3 py-2 rounded-md'
        >
          Show More
        </button>
      )}
    </div>
  );
};
