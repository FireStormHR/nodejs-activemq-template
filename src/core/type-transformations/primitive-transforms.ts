/**
 * Tries to convert an input to number
 *
 * Note: NaN will be returned as undefined
 */
export const toNumber = (x: any): number | undefined => {
  try {
    const float = parseFloat(x);

    return isNaN(float) ? undefined : float;
  } catch (error) {
    return undefined;
  }
};
