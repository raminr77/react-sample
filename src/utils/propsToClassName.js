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

export function propsToClassName(classes, props, result = new Set()) {
  result.add(props.className ?? '');

  for (const [variation, value = {}] of Object.entries(classes)) {
    if (isString(value) && variation === specialKeys.$all) {
      result.add(value);
      continue;
    }

    const propValue = props[variation] ?? false;
    const propValueStr = String(propValue);

    if (isString(value)) {
      if (isTruthy(propValue)) {
        result.add(value);
      }
      //
    } else if (isFn(value)) {
      const returnedValue = value(props);
      result.add(isString(returnedValue) ? returnedValue : '');
      //
    } else if (isObject(value) && isString(value[propValueStr])) {
      result.add(value[specialKeys.$all] ?? '');
      result.add(value[propValueStr]);
      //
    } else if (isObject(value) && isObject(value[propValueStr])) {
      const obj = value[propValueStr];
      result.add(value.$all ?? '');
      propsToClassName(obj, props, result);
      //
    } else if (isObject(value)) {
      result.add(value.$all ?? '');
    }
  }

  return [...result].join(' ').trim();
}

export const p2c = propsToClassName; // just an alias
