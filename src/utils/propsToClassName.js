// eslint-disable-next-line unicorn/prevent-abbreviations, import/no-unresolved
import { isString, isTruthy, isFn, isObject } from '.';

export const specialKeys = {
  $all: '$all'
};

/**
 * See Tests propsToClassName.test.ts
 * @param classes - an object that contains the class names,
 * @param props - an object that acts as a predicate for choosing the classes from `classes`
 * @param result
 */

// eslint-disable-next-line unicorn/prevent-abbreviations
export function propsToClassName(classes, props, result = new Set()) {
  result.add(props.className ?? '');

  for (const [variation, value = {}] of Object.entries(classes)) {
    if (isString(value) && variation === specialKeys.$all) {
      result.add(value);
      // eslint-disable-next-line no-continue
      continue;
    }

    const propertyValue = props[variation] ?? false;
    const propertyValueString = String(propertyValue);

    if (isString(value)) {
      if (isTruthy(propertyValue)) {
        result.add(value);
      }
      //
    } else if (isFn(value)) {
      const returnedValue = value(props);
      result.add(isString(returnedValue) ? returnedValue : '');
      //
    } else if (isObject(value) && isString(value[propertyValueString])) {
      result.add(value[specialKeys.$all] ?? '');
      result.add(value[propertyValueString]);
      //
    } else if (isObject(value) && isObject(value[propertyValueString])) {
      const object = value[propertyValueString];
      result.add(value.$all ?? '');
      propsToClassName(object, props, result);
      //
    } else if (isObject(value)) {
      result.add(value.$all ?? '');
    }
  }

  return [...result].join(' ').trim();
}

export const p2c = propsToClassName; // just an alias
