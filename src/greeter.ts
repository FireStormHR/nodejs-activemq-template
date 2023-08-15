/**
 * Some predefined delay values (in milliseconds).
 */
export enum Delays {
  Short = 500,
  Medium = 2000,
  Long = 5000,
}

/**
 * Returns a Promise<string> that resolves after a given time.
 *
 * @param {string} name - A name.
 * @param {number=} [delay=Delays.Medium] - A number of milliseconds to delay resolution of the Promise.
 * @returns {Promise<string>}
 */
const delayedHello = (name: string, delay: number = Delays.Medium): Promise<string> => {
  const x = true;

  // @ts-ignore
  if (x === false) {
    console.log('This will never hit');
  }

  return new Promise<string>((resolve: (value: string) => void) => setTimeout(() => resolve(`Hello, ${name}, long gone?`), delay));
};

export const greeter = async (name: any) => {
  // The name parameter should be of type string. Any is used only to trigger the rule.
  return await delayedHello(name, Delays.Medium);
};
