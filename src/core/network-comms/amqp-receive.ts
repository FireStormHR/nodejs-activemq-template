import ldsh from 'lodash';
const { mergeWith } = ldsh;
import { Connection, Receiver, EventContext, ReceiverOptions, delay, ReceiverEvents, types } from 'rhea-promise';
import { Observable, Subject, defer, from, map, shareReplay, take, takeUntil } from 'rxjs';
import { mergeCustomizer } from '#core/library-utilities/lodash-customizers.js';
import { maybeConsoleLog } from '#core/function-wrappers/maybe-console-log.js';
import { envVars } from '#core/library-utilities/dotenv-get-env-vars.js';

// TODO: DEMO Make this a .env var during the DEMO
const receiverName = 'receiver-1';

// const receiverAddress = 'queue://test';

// receive messages from the past one hour
const filterClause = `amqp.annotation.x-opt-enqueued-time > '${Date.now() - 3600 * 1000}'`;

const defaultReceiverOptions: ReceiverOptions = {
  name: receiverName,
  source: {
    address: envVars.WFAPP_amqp_receiver_adress_default,
    filter: {
      // 'apache.org:selector-filter:string': types.wrap_described(filterClause, 0x468c00000004),
    },
  },
  // TODO: reconsider if this should be a default option
  onSessionError: (context: EventContext) => {
    const sessionError = context.session && context.session.error;
    if (sessionError) {
      console.log(`An error occurred for session of receiver '${receiverName}': ${sessionError}.`);
    }
  },
};

type CreateReceiverResults = { openReceiver: Receiver; closeReceiverSubject: Subject<void> };

/**
 * Creates and opens an amqp receiver based on provided connection and receiver options.
 *
 * NOTE: Will not unsubscribe the source when the subscriber counter drops to zero
 * @param amqpOpenConnection An existing open amqp connection
 * @param receiverOptions Will be lazy-merged with a default receiver-options object. To bypass this, fill all the values
 * @param willLog Determines if verbose console logs will be written
 * @returns Observable which will emit once. Emits an object with two observables. One for connection and one for initiating closing event.
 */
export const createOpenReceiverAmqp = (amqpOpenConnection: Connection, receiverOptions: ReceiverOptions, willLog: boolean = false): Observable<CreateReceiverResults> => {
  /** Wraps the console log function around a, curry-provided, simple true or false */
  const consoleLog = maybeConsoleLog(willLog);

  // merge default receiver options with the supplied one
  const mergedReceiverOptions = mergeWith<ReceiverOptions, ReceiverOptions>(receiverOptions, defaultReceiverOptions, mergeCustomizer);

  const closeReceiverSubject = new Subject<void>();

  return defer(() => from(amqpOpenConnection.createReceiver(mergedReceiverOptions))).pipe(
    takeUntil(closeReceiverSubject),
    map((openReceiver: Receiver) => {
      consoleLog('amqp reciever created and opened with name: ', openReceiver.name);

      // subscribe with closeConnection logic
      startCloseReceiverObserverLogic(closeReceiverSubject, openReceiver, consoleLog);

      return { openReceiver, closeReceiverSubject };
    }),
    // Returns a new Observable that multicasts (shares) the original Observable
    // Informal analogy: A second subscriber looks to the same source as the first, instead of indirectly creating a second source
    // The replay aspect allows 'late to the party' situations
    shareReplay(1)
  );
};

/**
 * Creates an observable on events of a receiver. Listens to message and error events.
 *
 * NOTE: Never completes, so one must use cancellable pipe like takeUntil
 *
 * To get to the value of next use: `context.message`
 *
 * To get to the value of error use: `context.receiver.error`
 * @param receiver Receiver to listen to events
 * @returns Observable, emits next on message, emits error on error. Never completes, so one must use cancellable pipe like takeUntil
 */
export const createReceiverEventsObservable = (receiver: Receiver) =>
  new Observable<EventContext>((subscriber) => {
    receiver.on(ReceiverEvents.message, (context: EventContext) => {
      // {"priority":0,"message_annotations":{"x-opt-jms-dest":0},"message_id":"ID:L-ABgdpPgPJUTOf-52816-1691401015543-4:4:1:1:1","to":"queue://test","subject":"","correlation_id":"","creation_time":"2023-08-09T11:10:59.524Z","body":"extra test"}
      // consoleLog(`Received message: ${context.message}`);
      subscriber.next(context);
    });

    receiver.on(ReceiverEvents.receiverError, (context: EventContext) => {
      const receiverError = context.receiver && context.receiver.error;
      if (receiverError) {
        // consoleLog(`An error occurred for receiver '${receiverName}': ${receiverError}.`);
        subscriber.error(context);
      }
    });
  });

const startCloseReceiverObserverLogic = (closeReceiverSubject: Subject<void>, receiver: Receiver, consoleLog: (message?: any, ...optionalParams: any[]) => void): void => {
  closeReceiverSubject
    .pipe(
      take(1),
      map(() => {
        consoleLog('closing amqp receiver with name: ', receiver.name);

        return defer(() => from(receiver.close()));
      })
    )
    .subscribe(() => {
      consoleLog('amqp receiver closed with name: ', receiver.name);

      closeReceiverSubject.complete();
    });
};
