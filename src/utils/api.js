import { REQUEST_TYPE } from 'constants/RequestType';
import { get, post, CancelToken } from 'services/api';

export function apiRequestObject({ url, transformer, inputTransformer, type = REQUEST_TYPE.GET }) {
  function apiCall(data, options = {}) {
    const source = CancelToken.source();
    const { queryParams, ...apiOptions } = options;
    const moderatedOptions = {
      headers: { ...(options?.headers || {}) },
      ...(apiOptions || {})
    };

    const transformedData = inputTransformer ? inputTransformer(data) : data;
    const dataIsFormData = transformedData instanceof FormData;

    const modifiedData = dataIsFormData ? data : transformedData;

    let promise;
    if (type === REQUEST_TYPE.GET) {
      promise = get({
        url,
        config: {
          params: modifiedData,
          cancelToken: source.token,
          ...moderatedOptions
        }
      }).then(transformer || ((result) => result));
    }

    if (type === REQUEST_TYPE.POST) {
      promise = post({
        url,
        data: modifiedData,
        config: {
          cancelToken: source.token,
          ...moderatedOptions
        }
      }).then(transformer || ((result) => result));
    }

    promise.cancel = () => {
      source.cancel('Request was cancelled');
    };

    apiCall.cancel = promise.cancel;
    apiCall.onUploadProgress = apiOptions?.onUploadProgress;

    return promise;
  }

  apiCall.url = url;
  return apiCall;
}
