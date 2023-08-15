// TODO: Add tests for functions below ----------------------------------------------------------------------------------

// #region Lists

/**
 * In case it is an array, items will not be validated
 */
export const isArray = (x: any): x is any[] => Array.isArray(x);

/**
 * Check if all items in array meet validator
 */
export const checkItems = <T>(arr: any[], validator: (item: any) => item is T): arr is T[] => arr.every(validator);

export const isArrayItemsChecked = <T>(x: any, validator: (item: any) => item is T): x is T[] => isArray(x) && checkItems(x, validator);

// #endregion

// #region Objects

/**
 * Check if var is an object. Arrays, functions and null will not be regarded as object.
 */
export const isObject = (x: any): boolean => x !== null && typeof x === 'object' && !Array.isArray(x);

/**
 * Check if var is an object. Null will not be regarded as object.
 */
export const isObjectLike = (x: any): boolean => x !== null && (typeof x === 'object' || typeof x === 'function');

// #endregion
