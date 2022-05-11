const LOG_STACK = [];
export const sendLog = ({
  method = 'GET',
  message = 'Network Error',
  url = `[ PAGE ] ${window.location.href}`
}) => {
  // save or send your log
  LOG_STACK.push(`${message} \n [${method}] ${url}`);
};
