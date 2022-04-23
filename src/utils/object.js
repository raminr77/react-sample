export function removeUndefinedFromObj(obj = {}) {
  Object.keys(obj).forEach((key) => (obj[key] === undefined ? delete obj[key] : {}));
  return obj;
}

export function findByKeyValue(array = [], key = '', value = '') {
  return array.find((i) => i[key] === value);
}
