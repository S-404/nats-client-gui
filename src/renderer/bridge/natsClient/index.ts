import { NATS_MESSAGE_ADD, NATS_STATUS_CONNECTED } from '#app/events/constants.ts';
import { setConnected } from './setConnected.ts';
import { addMessage } from './addMessage.ts';


const natsActions = {
  [NATS_STATUS_CONNECTED]: setConnected,
  [NATS_MESSAGE_ADD]: addMessage,
};

export default natsActions;
