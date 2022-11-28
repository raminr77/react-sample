import axios, { AxiosRequestConfig } from 'axios';

import { store } from 'store';
import { redirect } from 'utils/url';
import { sendLog } from 'services/log';
import { SNACKBAR_TYPES } from 'constants/snackbar';
import { userLogoutAction } from 'store/user/user-slice';
import { generateSnackbar } from 'utils/generate-snackbar';
import { serviceGet, servicePost } from 'services/api/initialize';
import {
  INDEX_PAGE_ROUTE,
  NOT_FOUND_ROUTE,
  USER_LOGIN_ROUTE
} from 'routes/redirect-routes';

function handleResponse({
  response,
  reject,
  resolve
}: {
  response: any;
  reject: (result: any) => void;
  resolve: (result: any) => void;
}) {
  const status = response?.status || response.data?.status || 500;
  const message = response.data?.message || '';

  switch (status) {
    case 200: {
      resolve(response?.data);
      break;
    }
    case 301: {
      redirect(response?.data?.url || INDEX_PAGE_ROUTE);
      reject(response);
      break;
    }
    case 401: {
      store.dispatch(userLogoutAction());
      redirect({ url: USER_LOGIN_ROUTE });
      reject(response);
      break;
    }
    case 404: {
      redirect({ url: NOT_FOUND_ROUTE });
      reject(response);
      break;
    }
    default: {
      reject(response);
    }
  }

  if (status >= 300 && message) {
    generateSnackbar({ message, type: SNACKBAR_TYPES.ERROR });
    reject(response);
  }
}

function get({ url, config }: { url: string; config?: AxiosRequestConfig }) {
  return new Promise((resolve, reject) => {
    serviceGet(url, config)
      .then((response) => {
        handleResponse({ response, reject, resolve });
      })
      .catch((error) => {
        sendLog({ url, method: 'GET', message: 'GET Request Is Failed.' });
        reject(error);
      });
  });
}

function post({
  url,
  data,
  config
}: {
  url: string;
  data?: unknown;
  config?: AxiosRequestConfig;
}) {
  return new Promise((resolve, reject) => {
    servicePost(url, data, config)
      .then((response) => {
        handleResponse({ response, reject, resolve });
      })
      .catch((error) => {
        sendLog({ url, method: 'POST', message: 'POST Request Is Failed.' });
        reject(error);
      });
  });
}

const { CancelToken } = axios;
export { get, post, CancelToken };
