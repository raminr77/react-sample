export function removeUndefinedFromObject(object = {}) {
  Object.keys(object).forEach((key) =>
    // eslint-disable-next-line no-param-reassign
    object[key] === undefined ? delete object[key] : {}
  );
  return object;
}
