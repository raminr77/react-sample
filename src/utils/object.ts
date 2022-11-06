type InputObject = {
  [key: string | number]: unknown;
};

export function removeUndefinedFromObject(inputObject: InputObject = {}) {
  Object.keys(inputObject).forEach((key: string | number) => {
    if (inputObject[key] === undefined) {
      // eslint-disable-next-line no-param-reassign
      delete inputObject[key];
    }
    return {};
  });
  return inputObject;
}
