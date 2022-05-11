import { REQUEST_TYPE } from 'constants/RequestType';
import { get, post, CancelToken } from 'services/api';

export function apiRequestObject({ url, transformer, inputTransformer, type = REQUEST_TYPE.GET }) {
  const source = CancelToken.source();
  const apiCall = (data, options = {}) => {
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
