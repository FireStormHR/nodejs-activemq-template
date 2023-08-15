/**
 * Wrapper which catches any throws of {@link func}
 * @param func func to try, func can throw errors
 * @param defaultVal value to return when func throws
 * @param logOnError determines if errors should be logged. Default = `true`
 * @returns
 */
export const tryc = <T>(func: () => T, defaultVal: T, logOnError: boolean = true) => {
  try {
    return func();
  } catch (error) {
    if (logOnError) {
      console.warn('[tryc] error occured trying to execute input func. ', error);
    }
    return defaultVal;
  }
};
