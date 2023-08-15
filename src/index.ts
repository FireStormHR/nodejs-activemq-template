import { greeter } from '#src/greeter.js';
import { createOpenConnectionAmqp } from '#core/network-comms/amqp-connection.js';
import { createOpenReceiverAmqp, createReceiverEventsObservable } from '#core/network-comms/amqp-receive.js';
import { ConnectionOptions, ReceiverOptions } from 'rhea-promise';
import { logSub } from '#core/library-utilities/rxjs-test-observer-template.js';
import { take, takeWhile } from 'rxjs';
import { Validation } from 'monet';
// import {} from '#core/network-comms/amqp-send.js';

greeter('input').then((x) => {
  console.log(`Result: ${x}`);
});

const connectionOptions: ConnectionOptions = {
  host: 'localhost',
  hostname: 'localhost',
  username: 'admin',
  password: 'admin',
  port: 5672,
};

const receiverOptions: ReceiverOptions = {
  name: 'receiver-1',
  source: {
    address: 'queue://test',
    filter: {
      // 'apache.org:selector-filter:string': types.wrap_described(filterClause, 0x468c00000004),
    },
  },
};

const { connectionObservable, closeConnectionSubject } = createOpenConnectionAmqp(connectionOptions, true);

// open connection
connectionObservable.subscribe(
  logSub('connection-open', {
    next: (openConn) => {
      const createReceiverResultObjObservable = createOpenReceiverAmqp(openConn, receiverOptions, true);

      // open receiver
      createReceiverResultObjObservable.subscribe(
        logSub('receiver-open', {
          next: ({ openReceiver, closeReceiverSubject }) => {
            const receiverEventsObservable = createReceiverEventsObservable(openReceiver);

            // listen to receiver
            receiverEventsObservable.pipe(takeWhile((context) => new RegExp('sluiten maar').test(context?.message?.body ?? '') === false, true)).subscribe(
              logSub('receiver-event-listener', {
                next: (context) => {
                  console.log(`Received message: ${context.message}`);

                  const val: Validation<number, string> = context.message?.body !== 'sluiten maar' ? Validation.Success(context.message?.body) : Validation.Fail(404);

                  val.map((msg) => 'Converted!');

                  console.log('validation value: ', val.isSuccess() ? val.success() : val.fail());
                },
                complete: () => {
                  console.log('Closing receiver and connection');

                  closeReceiverSubject
                    .asObservable()
                    .pipe(take(1))
                    .subscribe({ complete: () => closeConnectionSubject.next() });

                  closeReceiverSubject.next();
                },
              })
            );
          },
        })
      );
    },
  })
);
