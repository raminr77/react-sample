import React from 'react';
import { usePageData } from 'hooks/usePageData';
import { getIndexPageData } from 'api/indexPage';

export const IndexPage = () => {
  // usePageData Example
  const { data, reload, pending } = usePageData({
    apiMethod: getIndexPageData,
    disabled: false,
    dataCached: true,
    apiData: {
      // your api data
      age: 24, // remove on inputTransformer
      name: 'ramin'
    }
    // onError: (error) => console.log('PAGE ERROR:', error),
    // onSuccess: (response) => console.log('PAGE RESULT:', response)
  });

  return (
    <div dir='ltr'>
      <h1>Index Page</h1>
      {/* For reCall API */}
      <button onClick={reload}>[ Reload ]</button>
      <hr />
      {pending && <div>LOADING ...</div>}
      <ul>
        {Array.isArray(data) &&
          data?.map((item, index) => (
            <li key={index}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};
