import axios from 'axios';

import { store } from 'store';
import { redirect } from 'utils/url';
import { sendLog } from 'services/log';
import { SNACKBAR_TYPES } from 'constants/Snackbar';
import { userLogoutAction } from 'store/user/userSlice';
import { generateSnackbar } from 'utils/generateSnackbar';
import { serviceGet, servicePost } from 'services/api/initialize';
import { INDEX_PAGE_ROUTE, NOT_FOUND_ROUTE, USER_LOGIN_ROUTE } from 'routes/RedirectRoutes';

function handleResponse({ response, reject, resolve }) {
  const status = response?.status || response.data?.status || 500;
  const message = response.data?.message || '';

  switch (status) {
    case 200:
      resolve(response?.data);
      break;
    case 301:
      redirect(response?.data?.url || INDEX_PAGE_ROUTE);
      reject(response);
      break;
    case 401:
      store.dispatch(userLogoutAction());
      redirect(USER_LOGIN_ROUTE);
      reject(response);
      break;
    case 404:
      redirect(NOT_FOUND_ROUTE);
      reject(response);
      break;
    default:
      reject(response);
  }

  if (status >= 300 && message) {
    generateSnackbar({ message, type: SNACKBAR_TYPES.ERROR });
    reject(response);
  }
}

function get({ url, config }) {
  return new Promise((resolve, reject) => {
    serviceGet(url, config)
      .then((response) => {
        handleResponse({ response, reject, resolve });
      })
      .catch((error) => {
        sendLog({ url, method: 'GET' });
        reject(error);
      });
  });
}

function post({ url, data, config }) {
  return new Promise((resolve, reject) => {
    servicePost(url, data, config)
      .then((response) => {
        handleResponse({ response, reject, resolve });
      })
      .catch((error) => {
        sendLog({ url, method: 'POST' });
        reject(error);
      });
  });
}

const CancelToken = axios.CancelToken;

export { get, post, CancelToken };
