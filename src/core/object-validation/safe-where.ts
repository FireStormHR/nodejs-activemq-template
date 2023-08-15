import { Validation } from 'monet';
import { isObject } from '#core/type-guards/object-guards.js';
import { Spec, ValidationError } from '#core/types.js';

/**
 * Takes an not-yet-validated object and for each key validates its value, getting its function from the spec object with the same keys.
 * @param o An not-yet-validated object
 * @param spec Object which contains validation functions, mappable to the input object
 * @returns A validation with either a type-safe {@link o} or a validation error object
 */
export const safeWhere = <T>(o: any, spec: Spec<T>): Validation<ValidationError, T> => {
  if (!isObject(o)) {
    return Validation.Fail({ message: 'Input is not an object' });
  }

  // TODO: Implement
  // TODO: Create tests, including case of spec misses new prop and vice versa

  return Validation.Success(o);
};
