/* eslint-disable react-hooks/exhaustive-deps */
import { noop } from 'lodash';
import { sendLog } from 'services/log';
import { useEffect, useState } from 'react';
import {
  hasAPICache,
  setAPICache,
  getAPICacheData,
  checkAPICacheTime
} from 'services/api/cache-system';

interface Properties {
  apiData?: any;
  apiMethod: any;
  disabled?: boolean;
  expireTime?: number;
  dataCached?: boolean;
  onFinally?: () => void;
  onError?: (error: string) => void;
  onSuccess?: (response: any) => void;
}

export const usePageData = ({
  apiMethod,
  onError = noop,
  onSuccess = noop,
  onFinally = noop,
  apiData = null,
  disabled = false,
  dataCached = false,
  expireTime = 600_000 // 10 min
}: Properties) => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const CACHE_NAME = `CACHE_PAGE_REQUEST_[${apiMethod.url}]`;

  const fetchData = () => {
    if (!apiMethod || disabled) return;
    if (
      dataCached &&
      hasAPICache(CACHE_NAME) &&
      checkAPICacheTime({ name: CACHE_NAME, expireTime })
    ) {
      setData(getAPICacheData(CACHE_NAME));
      return;
    }
    setPending(true);
    try {
      apiMethod(apiData)
        .then((response: any) => {
          if (dataCached) {
            setAPICache({ name: CACHE_NAME, data: response });
          }
          setData(response);
        })
        .catch((error: any) => {
          onError?.(error);
        })
        .finally(() => {
          onFinally?.();
          setPending(false);
        });
    } catch {
      setPending(false);
      sendLog({ url: apiMethod.url, message: 'Error: UsePageData' });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!data || pending) return;
    onSuccess?.(data);
  }, [data, pending]);

  return {
    data,
    pending,
    reload: fetchData
  };
};
