import { Connection, Sender, EventContext, Message, ConnectionOptions, Delivery, SenderOptions } from 'rhea-promise';

// TODO: Completely refactor to observables

const host = 'localhost';
const username = 'admin';
const password = 'admin';
const port = 5672;
const senderAddress = 'queue://test';

export const amqpActiveMqSendTest = (): Promise<string> => {
  const connectionOptions: ConnectionOptions = {
    transport: 'tcp',
    host: host,
    hostname: host,
    username: username,
    password: password,
    port: port,
    reconnect: false,
  };
  const connection: Connection = new Connection(connectionOptions);
  const senderName = 'sender-1';
  const senderOptions: SenderOptions = {
    name: senderName,
    target: {
      address: senderAddress,
    },
    onError: (context: EventContext) => {
      const senderError = context.sender && context.sender.error;
      if (senderError) {
        console.log(`>>>>> [${connection.id}] An error occurred for sender '${senderName}': ${senderError}.`);
      }
    },
    onSessionError: (context: EventContext) => {
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        console.log(`>>>>> [${connection.id}] An error occurred for session of sender '${senderName}': ${sessionError}.`);
      }
    },
  };

  return connection.open().then(() => {
    console.log('amqp send connection opened');

    return connection.createSender(senderOptions).then((sender: Sender) => {
      console.log('amqp send sender created');

      const message: Message = {
        body: 'Hello World!!',
        message_id: '12343434343434',
      };

      // Please, note that we are not awaiting on sender.send()
      // You will notice that `delivery.settled` will be `false`.
      const delivery: Delivery = sender.send(message);
      console.log(`>>>>>[${connection.id}] send -> Delivery id: ${delivery.id}, settled: ${delivery.settled}`);

      return sender.close().then(() => {
        console.log('sender closed');
        return connection.close().then((): string => {
          console.log('sender connection closed');
          return 'Done sending, everything closed';
        });
      });
    });
  });
};
