export function removeUndefinedFromObject(
  inputObject: Record<string | number, any> = {}
) {
  Object.keys(inputObject).forEach((key: string | number) => {
    if (inputObject[key] === undefined) {
      delete inputObject[key];
    }
    return {};
  });
  return inputObject;
}
