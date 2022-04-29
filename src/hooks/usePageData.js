import QS from 'qs';
import useSWR from 'swr';
import isFunction from 'lodash/isFunction';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function laggy(useSWRNext) {
  return (key, fetcher, config) => {
    // Use a ref to store previous returned data.
    const laggyDataRef = useRef();

    // Actual SWR hook.
    const swr = useSWRNext(key, fetcher, config);

    useEffect(() => {
      // Update ref if data is not undefined.
      if (swr.data !== undefined) {
        laggyDataRef.current = swr.data;
      }
    }, [swr.data]);

    // Expose a method to clear the laggy data, if any.
    const resetLaggy = useCallback(() => {
      laggyDataRef.current = undefined;
    }, []);

    // Fallback to previous data if the current data is undefined.
    const dataOrLaggyData = swr.data === undefined ? laggyDataRef.current : swr.data;

    // Is it showing previous data?
    const isLagging = swr.data === undefined && laggyDataRef.current !== undefined;

    // Also add a `isLagging` field to SWR.
    return Object.assign({}, swr, {
      data: dataOrLaggyData,
      isLagging,
      resetLaggy
    });
  };
}

function usePageData({
  apiData,
  disabled,
  apiMethod,
  initialValue,
  onError = () => {},
  onSuccess = () => {}
}) {
  const url =
    (isFunction(apiMethod.url) ? apiMethod.url(apiData) : apiMethod.url) + QS.stringify(apiData);
  const [fallbackData] = useState(initialValue || {});
  const isReady = !disabled;

  const fetcher = () => {
    return apiMethod(apiData);
  };

  const memoizedUrlOnLoad = useMemo(() => [url], [url]);

  const getKey = () => {
    if (!isReady) return null;
    return memoizedUrlOnLoad;
  };

  const { data, error, mutate, isValidating } = useSWR(getKey(), fetcher, {
    use: [laggy],
    onError: onError,
    shouldRetryOnError: false,
    fallbackData: fallbackData
  });

  const reload = () => mutate(url);
  const setPageData = (newData) => mutate(newData, false);

  const pending = (!error && !data && !!url && !disabled) || (isValidating && !disabled);

  useEffect(() => {
    if (!data || pending) return;
    onSuccess?.(data);
  }, [data, pending]);

  return {
    data,
    reload,
    pending,
    setPageData,
    hasError: !!error
  };
}

export default usePageData;
export { usePageData };
