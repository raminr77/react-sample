import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';

import { redirect } from 'utils/url';
import { userSelectors } from 'store/user/userSelectors';
import { INDEX_PAGE_ROUTE } from 'routes/RedirectRoutes';
import {
  setAPICache,
  getAPICacheData,
  checkAPICacheTime,
  hasAPICache
} from 'services/api/cacheSystem';

export const useAPI = ({
  apiMethod,
  isPrivate = false,
  onError = () => {},
  dataCached = false,
  onSuccess = () => {},
  onFinally = () => {},
  requestOnLoad = false,
  requestDataOnLoad = {},
  dependenciesOnLoad = [],
  expireTime = 600000, // 10 min
  onUploadProgressCallback = () => {}
}) => {
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const CACHE_NAME = `CACHE_API_REQUEST_[${apiMethod.url}]`;
  const { isAuthenticated } = useSelector(userSelectors.userInfo);

  const onUploadProgress = (progressEvent) => {
    onUploadProgressCallback?.(progressEvent);
  };

  const endLoading = () => setLoading(false);
  const startLoading = () => setLoading(true);

  const request = (apiData) => {
    apiData = apiData ?? requestDataOnLoad;
    return new Promise((resolve, reject) => {
      if (
        dataCached &&
        hasAPICache(CACHE_NAME) &&
        checkAPICacheTime({ name: CACHE_NAME, expireTime })
      ) {
        const cachedData = getAPICacheData(CACHE_NAME);
        onSuccess?.(cachedData, apiData);
        resolve(cachedData);
        setHasError(false);
        endLoading();
        return;
      }

      startLoading();

      // Private Request
      if (isPrivate && !isAuthenticated) {
        onSuccess?.({}, apiData);
        resolve({});
        endLoading();
        redirect(INDEX_PAGE_ROUTE);
        return;
      }

      // API
      apiMethod(apiData, { onUploadProgress })
        ?.then((response) => {
          if (dataCached) {
            setAPICache({ name: CACHE_NAME, data: response });
          }
          onSuccess?.(response, apiData);
          resolve(response);
          setHasError(false);
        })
        ?.catch((error) => {
          onError?.(error, apiData);
          reject(error);
          setHasError(true);
        })
        ?.finally(() => {
          endLoading();
          onFinally?.(apiData);
        });
    });
  };

  const memoizedDependenciesOnLoad = useMemo(() => [...dependenciesOnLoad], [dependenciesOnLoad]);

  useEffect(() => {
    if (requestOnLoad) {
      request(requestDataOnLoad);
    }
  }, memoizedDependenciesOnLoad);

  const cancelRequest = () => {
    apiMethod?.cancel?.();
  };

  return {
    request,
    hasError,
    cancelRequest,
    pending: loading
  };
};
