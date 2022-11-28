import QS from 'qs';
import axios from 'axios';
import { isMobile } from 'react-device-detect';

import { generateSnackbar } from 'utils/generate-snackbar';
import { CONNECTION_ERROR } from 'constants/error-messages';

const TOKEN = ''; // Read Your TOKEN
const MAX_REQUEST_PER_SECOND = 20;

let isAPILock = false;
let requestPerSecondCount = 0;
let previousAPICallTime = Date.now();

const getDeviceType = () => (isMobile ? 'mobile' : 'desktop');

const $axios = axios.create({
  timeout: 40_000,
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'X-Web-Optimize-Response': 1,
    'X-Web-Client': getDeviceType(),
    Authorization: `token ${TOKEN}`,
    'Content-Type': 'application/json'
  }
});

function onError(error: any) {
  if (!axios.isCancel(error)) generateSnackbar({ message: CONNECTION_ERROR });
  return Promise.reject(error);
}

const handleInterceptorsLockAPI = () => {
  throw new axios.Cancel();
};

$axios.interceptors.request.use((config) => {
  if (isAPILock) handleInterceptorsLockAPI();

  const currentTime = Date.now();
  const diffTime = currentTime - previousAPICallTime;
  const isInPreviousSecond = diffTime < 1000;

  if (isInPreviousSecond) {
    requestPerSecondCount++;
  } else {
    requestPerSecondCount = 0;
    previousAPICallTime = currentTime;
  }

  if (requestPerSecondCount > MAX_REQUEST_PER_SECOND) {
    isAPILock = true;
    handleInterceptorsLockAPI();
  }

  const newConfig = { ...config };
  newConfig.paramsSerializer = (parameters) => {
    return QS.stringify(parameters, {
      arrayFormat: 'indices',
      encode: true
    });
  };
  return newConfig;
}, onError);

const serviceGet = $axios.get;
const servicePost = $axios.post;

export { servicePost, serviceGet };
