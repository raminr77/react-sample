import { sendLog } from 'services/log';
import { useEffect, useState } from 'react';

const CACHE_DATA = {};

export const usePageData = ({
  apiMethod,
  apiData = null,
  disabled = false,
  dataCached = false,
  expireTime = 600000, // 10 min
  onError = () => {},
  onSuccess = () => {}
}) => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const CACHE_NAME = `CACHE_PAGE_REQUEST_[${apiMethod.url}]`;

  const checkCacheTime = (name) => {
    const cacheTime = CACHE_DATA[name]?.expireTime || 0;
    const diffTime = new Date().getTime() - expireTime;
    if (diffTime < cacheTime) {
      return true;
    }
    return false;
  };

  const fetchData = () => {
    if (!apiMethod || disabled) return;
    if (dataCached && CACHE_DATA[CACHE_NAME] && checkCacheTime(CACHE_NAME)) {
      setData(CACHE_DATA[CACHE_NAME].data);
      return;
    }
    setPending(true);
    try {
      apiMethod(apiData)
        .then((response) => {
          if (dataCached) {
            CACHE_DATA[CACHE_NAME] = { data: response, expireTime: new Date().getTime() };
            return;
          }
          setData(response);
        })
        .catch((err) => {
          onError?.(err);
        })
        .finally(() => {
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
