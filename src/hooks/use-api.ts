/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';

import { noop } from 'lodash';
import { redirect } from 'utils/url';
import { userSelectors } from 'store/user/user-selectors';
import { INDEX_PAGE_ROUTE } from 'routes/route-path';
import {
  hasAPICache,
  setAPICache,
  getAPICacheData,
  checkAPICacheTime
} from 'services/api/cache-system';

interface Properties {
  apiMethod: any;
  expireTime?: number;
  isPrivate?: boolean;
  dataCached?: boolean;
  onFinally?: () => void;
  requestOnLoad?: boolean;
  requestDataOnLoad?: any;
  dependenciesOnLoad?: any[];
  onError?: (error: string) => void;
  onSuccess?: (response: any) => void;
  onUploadProgressCallback?: (response: any) => void;
}

export const useAPI = ({
  apiMethod,
  isPrivate = false,
  onError = noop,
  dataCached = false,
  onSuccess = noop,
  onFinally = noop,
  requestOnLoad = false,
  requestDataOnLoad = {},
  dependenciesOnLoad = [],
  expireTime = 600_000, // 10 min
  onUploadProgressCallback = noop
}: Properties) => {
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const CACHE_NAME = `CACHE_API_REQUEST_[${apiMethod.url}]`;
  const { isAuthenticated } = useSelector(userSelectors.userInfo);

  const onUploadProgress = (progressEvent: any) => {
    onUploadProgressCallback?.(progressEvent);
  };

  const endLoading = () => setLoading(false);
  const startLoading = () => setLoading(true);

  const request = (apiData?: any) => {
    // eslint-disable-next-line no-param-reassign
    apiData = apiData ?? requestDataOnLoad;
    return new Promise((resolve, reject) => {
      if (
        dataCached &&
        hasAPICache(CACHE_NAME) &&
        checkAPICacheTime({ name: CACHE_NAME, expireTime })
      ) {
        const cachedData = getAPICacheData(CACHE_NAME);
        onSuccess?.(cachedData);
        resolve(cachedData);
        setHasError(false);
        endLoading();
        return;
      }

      startLoading();

      // Private Request
      if (isPrivate && !isAuthenticated) {
        resolve({});
        endLoading();
        onSuccess?.({});
        redirect({ url: INDEX_PAGE_ROUTE });
        return;
      }

      // API
      apiMethod(apiData, { onUploadProgress })
        ?.then((response: any) => {
          if (dataCached) {
            setAPICache({ name: CACHE_NAME, data: response });
          }
          onSuccess?.(response);
          resolve(response);
          setHasError(false);
        })
        ?.catch((error: any) => {
          onError?.(error);
          reject(error);
          setHasError(true);
        })
        ?.finally(() => {
          endLoading();
          onFinally?.();
        });
    });
  };

  const memoizedDependenciesOnLoad = useMemo(
    () => [...dependenciesOnLoad],
    [dependenciesOnLoad]
  );

  useEffect(() => {
    if (requestOnLoad) {
      request(requestDataOnLoad);
    }
  }, [memoizedDependenciesOnLoad]);

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
