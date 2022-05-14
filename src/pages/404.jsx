import React from 'react';
import { Link } from 'react-router-dom';
import { INDEX_PAGE_ROUTE } from 'routes/RedirectRoutes';

export const NotFoundPage = () => {
  return (
    <div dir='ltr' className='flex-col h-screen w-screen flex items-center justify-center'>
      <h3 className='text-xl'>404 | Not Found</h3>
      <br />
      <Link to={INDEX_PAGE_ROUTE}>Back To Home</Link>
    </div>
  );
};
