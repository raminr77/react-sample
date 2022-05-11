export const sendLog = ({
  method = 'GET',
  message = 'Network Error',
  url = `[ PAGE ] ${window.location.href}`
}) => {
  console.error(`${message} \n [${method}] ${url}`);
};
