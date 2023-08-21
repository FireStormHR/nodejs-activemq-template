import { greeter } from '#src/greeter.js';
import { createOpenConnectionAmqp } from '#core/network-comms/amqp-connection.js';
import { createOpenReceiverAmqp, createReceiverEventsObservable } from '#core/network-comms/amqp-receive.js';
import { ConnectionOptions, ReceiverOptions } from 'rhea-promise';
import { logSub } from '#core/library-utilities/rxjs-test-observer-template.js';
import { Subject, map, switchMap, take, takeWhile } from 'rxjs';
// import {} from '#core/network-comms/amqp-send.js';
import type { Validation } from 'monet';
import monetPkg from 'monet';

const { Validation: ValidationCreator } = monetPkg;

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

const closeReceiver = (closeReceiverSubject: Subject<void>) => {
  console.log('Closing receiver and connection');

  closeReceiverSubject
    .asObservable()
    .pipe(take(1))
    .subscribe({ complete: () => closeConnectionSubject.next() });

  closeReceiverSubject.next();
};

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

                  let val: Validation<number, string> = context.message?.body !== 'sluiten maar' ? ValidationCreator.Success(context.message?.body) : ValidationCreator.Fail(404);

                  val = val.map((msg) => "Converted because value wasnt 'sluiten maar'!");

                  console.log('validation value: ', val.isSuccess() ? val.success() : val.fail());
                },
                complete: () => {
                  closeReceiver(closeReceiverSubject);
                },
              })
            );
          },
        })
      );
    },
  })
);

// Alternate implementation

// connectionObservable
//   .pipe(
//     // open receiver
//     switchMap((openConn) => createOpenReceiverAmqp(openConn, receiverOptions, true)),
//     switchMap(({ openReceiver, closeReceiverSubject }) => createReceiverEventsObservable(openReceiver).pipe(map((context) => ({ closeReceiverSubject, context })))),
//     takeWhile(({ closeReceiverSubject, context }) => new RegExp('sluiten maar').test(context?.message?.body ?? '') === false, true)
//   )
//   // listen to receiver
//   .subscribe(
//     logSub('receiver-event-listener', {
//       next: ({ closeReceiverSubject, context }) => {
//         console.log(`Received message: ${context.message}`);

//         let val: Validation<number, string> = context.message?.body !== 'sluiten maar' ? ValidationCreator.Success(context.message?.body) : ValidationCreator.Fail(404);

//         val = val.map((msg) => "Converted because value wasnt 'sluiten maar'!");

//         val = val.failMap((num) => {
//           closeReceiver(closeReceiverSubject);

//           return num;
//         });

//         console.log('validation value: ', val.isSuccess() ? val.success() : val.fail());
//       },
//     })
//   );
