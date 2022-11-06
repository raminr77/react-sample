import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import reportWebVitals from 'reportWebVitals';

import { store } from 'store';
import { Routes } from 'routes';
import { SnackbarWrapper } from 'components/shared/snackbar/SnackbarWrapper';

import 'animate.css';
import 'styles/index.scss';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarWrapper />
      <Routes />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
