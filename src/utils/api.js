import { store } from '@/store/configureStore';
import { WEB_VIEW_TOKEN_PARAM } from '@/constants/queryParams';
import { REDUCER_NAMES } from '@/constants/reducerNames';
import { isFunction, isServerSide, getSearchParams } from '@digikala/utils';
import { CLIENT_TYPE_HEADER } from '@/constants/headers';
import { REQUEST_TYPE } from '@/constants/api';
import { CancelToken } from '@/services/api';
import { isMobile } from 'react-device-detect';
import { get, post } from '@/services/api';

const getDeviceType = () => (isMobile ? 'mobile' : 'desktop');

export function apiRequestObject({
  url,
  type = REQUEST_TYPE.GET,
  options = {},
  transformer,
  inputTransformer,
  isPrivate,
  isPageGetRequest
}) {
  // TODO absolute tof
  // TODO we should have just 1 argument for pass option and in apiCall
  // options is a bad name! we should separate axios options from other options
  const initialOptions = options;
  function apiCall(data, options = {}) {
    const clientSideQueryParams = isServerSide ? {} : getSearchParams();
    const { queryParams, ...apiOptions } = options;
    const source = CancelToken.source();
    const moderatedUrl = isFunction(url) ? url(data) : url;
    const moderatedOptions = {
      headers: { [CLIENT_TYPE_HEADER]: getDeviceType(), ...(options?.headers || {}) },
      ...(initialOptions || {}),
      ...(apiOptions || {})
    };
    const state = isServerSide ? undefined : store?.getState();
    const transformedData = inputTransformer ? inputTransformer(data) : data;
    const dataIsFormData = isServerSide ? false : transformedData instanceof FormData;
    // TODO tof, query params not added to form data
    const modifiedData = dataIsFormData
      ? transformedData
      : {
          [WEB_VIEW_TOKEN_PARAM]: state?.[REDUCER_NAMES.DEVICE]?.webViewData?.isWebView
            ? state?.[REDUCER_NAMES.DEVICE]?.webViewData?.webViewToken
            : undefined,
          ...(queryParams || {}),
          ...(clientSideQueryParams || {}),
          ...(transformedData || {})
        };
    let promise;
    if (type === REQUEST_TYPE.GET) {
      promise = get({
        url: moderatedUrl,
        config: {
          params: modifiedData,
          cancelToken: source.token,
          ...moderatedOptions
        },
        isPageGetRequest
      }).then(transformer || ((result) => result));
    } else {
      promise = post({
        url: moderatedUrl,
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
    apiCall.onUploadProgress = initialOptions?.onUploadProgress || apiOptions?.onUploadProgress;
    return promise;
  }
  apiCall.url = url;
  apiCall.isPrivate = isPrivate;
  return apiCall;
}
