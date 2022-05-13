import { REQUEST_TYPE } from 'constants/RequestType';
import { get, post, CancelToken } from 'services/api';

const REQUEST_LIST = {};
const MIN_TIME_FOR_DUPLICATE_REQUEST = 1000;

export function apiRequestObject({ url, transformer, inputTransformer, type = REQUEST_TYPE.GET }) {
  const source = CancelToken.source();
  const apiCall = (data, options = {}) => {
    // Cancel Duplicate Request
    const REQUEST_HASH = `[${type}][${url}][${JSON.stringify(data)}]`;
    if (!!REQUEST_LIST[REQUEST_HASH]) {
      const diffTime = new Date().getTime() - REQUEST_LIST[REQUEST_HASH];
      if (diffTime < MIN_TIME_FOR_DUPLICATE_REQUEST) {
        delete REQUEST_LIST[REQUEST_HASH];
        throw 'Request was cancelled';
      } else {
        REQUEST_LIST[REQUEST_HASH] = new Date().getTime();
      }
    } else {
      REQUEST_LIST[REQUEST_HASH] = new Date().getTime();
    }
    // start New Request
    const moderatedOptions = { ...options };
    const transformedData = inputTransformer ? inputTransformer(data) : data;
    const dataIsFormData = transformedData instanceof FormData;
    const modifiedData = dataIsFormData ? data : transformedData;

    return new Promise((resolve, reject) => {
      try {
        // RESPONSE
        const handleResponse = (response) => {
          if (transformer) {
            resolve(transformer({ data: response }));
          }
          resolve(response);
        };
        // GET
        if (type === REQUEST_TYPE.GET) {
          get({
            url,
            config: {
              params: modifiedData,
              cancelToken: source.token,
              ...moderatedOptions
            }
          }).then(handleResponse);
        }
        // POST
        if (type === REQUEST_TYPE.POST) {
          post({
            url,
            data: modifiedData,
            config: {
              cancelToken: source.token,
              ...moderatedOptions
            }
          }).then(handleResponse);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  apiCall.cancel = () => {
    source.cancel('Request was cancelled');
  };
  apiCall.url = url;
  return apiCall;
}
