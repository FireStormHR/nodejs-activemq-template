import { isArray } from '#src/core/type-guards/object-guards.js';

/**
 * This merge-customizer is usefull for objects with arrays.
 *
 * Used with lodash's mergeWith.
 *
 * Quick reference: {@link https://lodash.com/docs/4.17.15#mergeWith}
 * @example
 * const object = { a: [1], b: [2] };
 * const other = { a: [3], b: [4] };
 * mergeWith(object, other, thisCustomizer);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */
export const mergeCustomizer = (objValue: any, srcValue: any, _key: string) => {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }

  return undefined;
};
