import React from 'react';
import { INDEX_PAGE_ROUTE } from 'routes/route-path';

// PAGES
import { IndexPage } from 'pages';

export const PAGE_ROUTES = [
  {
    id: 1,
    isPrivate: false,
    deactivate: false,
    path: INDEX_PAGE_ROUTE,
    element: <IndexPage />
  }
];
