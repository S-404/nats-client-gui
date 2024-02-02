import dayjs from 'dayjs';
import NatsClientStore from '#renderer/store/NatsClientStore.ts';


type NatsPacket = {
  subjectId: string;
  packet: {
    payload: string;
    timestamp: number;
  }
  type: 'response';
}
export const addMessage = (message: NatsPacket) => {
    if (message.type === 'response') {
      const payload = JSON.parse(message.packet.payload);
      const date = dayjs.unix(message.packet.timestamp).format('YYYY-MM-DD HH:mm:ss');
      const messageStr = `--- ${date} ---\n${JSON.stringify(payload, undefined, 2)}`;
      NatsClientStore.addMessage({ subjectId: message.subjectId, message: messageStr });
    }
  }
;
