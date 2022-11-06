const CACHE_STORE = {}; // you can save redux or ...

export const checkAPICacheTime = ({ name, expireTime = 600_000 }) => {
  const cacheTime = CACHE_STORE[name]?.expireTime || 0;
  const diffTime = Date.now() - expireTime;
  if (diffTime < cacheTime) {
    return true;
  }
  delete CACHE_STORE[name];
  return false;
};

export const hasAPICache = (name) => {
  return !!CACHE_STORE[name];
};

export const getAPICacheData = (name) => {
  return CACHE_STORE[name].data;
};

export const setAPICache = ({ name, data }) => {
  CACHE_STORE[name] = { data, expireTime: Date.now() };
};
