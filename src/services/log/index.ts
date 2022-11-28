import { REQUEST_TYPES } from 'constants/request-types';

const LOG_STACK = [];

export const sendLog = ({
  message = 'Network Error',
  method = REQUEST_TYPES.GET,
  url = `[ PAGE ] ${window.location.href}`
}: {
  method?: GRequestMethod;
  message: string;
  url?: string;
}): void => {
  // save or send your log
  LOG_STACK.push(`${message} \n [${method}] ${url}`);
};
