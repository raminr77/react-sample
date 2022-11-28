import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { reportWebVitals } from 'reportWebVitals';

import { store } from 'store';
import { Routes } from 'routes';
import { SnackbarWrapper } from 'components/shared/snackbar-wrapper';

import 'animate.css';
import 'styles/index.scss';

const rootElement = document.querySelector('#root');

if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarWrapper />
      <Routes />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
