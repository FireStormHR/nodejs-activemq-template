import { Connection, Receiver, EventContext, ConnectionOptions, ReceiverOptions, delay, ReceiverEvents, types } from 'rhea-promise';
import ldsh from 'lodash';
const { mergeWith } = ldsh;
import { mergeCustomizer } from '#core/library-utilities/lodash-customizers.js';
import { envVars } from '#core/library-utilities/dotenv-get-env-vars.js';
import { Observable, Subject, defer, finalize, from, map, mergeMap, shareReplay, take, takeUntil, tap } from 'rxjs';
import { maybeConsoleLog } from '#core/function-wrappers/maybe-console-log.js';

const username = 'admin';
const password = 'admin';

type ConnectionObservables = { connectionObservable: Observable<Connection>; closeConnectionSubject: Subject<void> };

const defaultConnectionOptions: ConnectionOptions = {
  transport: 'tcp',
  host: envVars.WFAPP_amqp_connection_host_default,
  hostname: envVars.WFAPP_amqp_connection_host_default,
  // username: username,
  // password: password,
  port: envVars.WFAPP_amqp_connection_port_default,
  reconnect: false,
  /** Some options below left at default, while it may be desirable to handle manually. See: {@link https://github.com/amqp/rhea/blob/main/README.md#:~:text=credit_window%20%2D%20A%20%27prefetch%27%20window,them.%20Defaults%20to%20true.} */
  receiver_options: { autoaccept: true, autosettle: true, credit_window: 1000 },
  sender_options: { autosettle: true },
};

/**
 * Creates and opens an amqp connection based on provided connection options.
 *
 * NOTE: Will not unsubscribe the source when the subscriber counter drops to zero
 * @param connectionOptions Will be lazy-merged with a default connection-options object. To bypass this, fill all the values
 * @param willLog Determines if verbose console logs will be written
 * @returns object with two observables. One for connection and one for initiating closing event.
 */
export const createOpenConnectionAmqp = (connectionOptions: ConnectionOptions, willLog: boolean = false): ConnectionObservables => {
  /** Wraps the console log function around a, curry-provided, simple true or false */
  const consoleLog = maybeConsoleLog(willLog);

  // merge default connection options with the supplied one
  const mergedConnectionOptions = mergeWith<ConnectionOptions, ConnectionOptions>(connectionOptions, defaultConnectionOptions, mergeCustomizer);

  const connection: Connection = new Connection(mergedConnectionOptions);

  const closeConnectionSubject = new Subject<void>();

  // subscribe with closeConnection logic
  startCloseConnectionObserverLogic(closeConnectionSubject, connection, consoleLog);

  // the connection as an observable
  const connectionObservable = defer(() => from(connection.open())).pipe(
    takeUntil(closeConnectionSubject),
    tap((_) => {
      consoleLog('amqp connection opened with hostName: ', mergedConnectionOptions.hostname);
    }),
    // Returns a new Observable that multicasts (shares) the original Observable
    // Informal analogy: A second subscriber looks to the same source as the first, instead of indirectly creating a second source
    // The replay aspect allows 'late to the party' situations
    shareReplay(1)
  );

  return { connectionObservable, closeConnectionSubject };
};

const startCloseConnectionObserverLogic = (closeConnectionSubject: Subject<void>, connection: Connection, consoleLog: (message?: any, ...optionalParams: any[]) => void): void => {
  closeConnectionSubject
    .pipe(
      take(1),
      mergeMap(() => {
        consoleLog('closing amqp connection with hostname: ', connection.options.hostname);

        return defer(() => from(connection.close()));
      })
    )
    .subscribe(() => {
      consoleLog('amqp connection closed with hostname: ', connection.options.hostname);

      closeConnectionSubject.complete();
    });
};
