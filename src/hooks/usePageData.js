import { sendLog } from 'services/log';
import { useEffect, useState } from 'react';
import {
  setAPICache,
  getAPICacheData,
  checkAPICacheTime,
  hasAPICache
} from 'services/api/cacheSystem';

export const usePageData = ({
  apiMethod,
  apiData = null,
  disabled = false,
  dataCached = false,
  onError = () => {},
  onSuccess = () => {},
  onFinally = () => {},
  expireTime = 600000 // 10 min
}) => {
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
        .then((response) => {
          if (dataCached) {
            setAPICache({ name: CACHE_NAME, data: response });
          }
          setData(response);
        })
        .catch((err) => {
          onError?.(err);
        })
        .finally(() => {
          onFinally?.();
          setPending(false);
        });
    } catch (e) {
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
