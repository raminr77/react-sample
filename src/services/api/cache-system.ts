type Cache = {
  [key: string]: {
    data: any;
    expireTime: number;
  };
};
const CACHE_STORE: Cache = {}; // you can save redux or ...

interface Properties {
  name: string;
  expireTime?: number;
}

export const checkAPICacheTime = ({
  name,
  expireTime = 600_000
}: Properties): boolean => {
  const cacheTime = CACHE_STORE[name]?.expireTime || 0;
  const diffTime = Date.now() - expireTime;
  if (diffTime < cacheTime) {
    return true;
  }
  delete CACHE_STORE[name];
  return false;
};

export const hasAPICache = (name: string): boolean => {
  return !!CACHE_STORE[name];
};

export const getAPICacheData = (name: string): any => {
  return CACHE_STORE[name].data;
};

export const setAPICache = ({ name, data }: { name: string; data: any }): void => {
  CACHE_STORE[name] = { data, expireTime: Date.now() };
};
