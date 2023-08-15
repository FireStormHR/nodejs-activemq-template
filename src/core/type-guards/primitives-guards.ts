/**
 * Checks if value is not `null` or `undefined`
 */
export const isUnassigned = (x: any) => x === null || x === undefined;

/**
 * Check if {@link x} is of type number. NaN will return false
 */
export const isNumber = (x: any): x is number => !isUnassigned(x) && typeof x === 'number' && !isNaN(x);

export const isString = (x: any): x is string => typeof x === 'string';

export const isNonEmptyString = (x: any): x is string => isString(x) && x.length > 0;
