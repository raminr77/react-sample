import { sendLog } from 'services/log';
import { useEffect, useState } from 'react';

export const usePageData = ({
  apiMethod,
  apiData = null,
  disabled = false,
  onError = () => {},
  onSuccess = () => {}
}) => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);

  const fetchData = () => {
    if (!apiMethod || disabled) return;
    setPending(true);
    try {
      apiMethod(apiData)
        .then((response) => {
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
