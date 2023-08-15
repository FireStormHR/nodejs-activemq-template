// TODO: create tests

/**
 * Wraps the console log function around a, curry-provided, simple true or false
 */
export const maybeConsoleLog =
  (willLog: boolean) =>
  (message?: any, ...optionalParams: any[]): void => {
    if (willLog) {
      console.log(message, ...optionalParams);
    }
  };
