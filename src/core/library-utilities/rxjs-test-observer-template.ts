import { Observer } from 'rxjs';

// TODO: Write tests

export const logSub = <T>(observerName: string, partialObserver: Partial<Observer<T>>): Observer<T> => ({
  next: (value: T) => {
    console.log(`Source of observer ${observerName} next'ed`);

    if (partialObserver.next) {
      partialObserver.next(value);
    }
  },
  error: (err) => {
    console.log(`An error occured at source of observer ${observerName},\n\n Error content is ${err}`);

    if (partialObserver.error) {
      partialObserver.error(err);
    }
  },
  complete: () => {
    console.log(`Source of observer ${observerName} completed`);

    if (partialObserver.complete) {
      partialObserver.complete();
    }
  },
});
