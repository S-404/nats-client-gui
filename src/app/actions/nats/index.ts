import { IpcRendererEvent } from 'electron';
import nats, { NatsCommonRequest, Server } from '#lib/nats.ts';

const natsConnect = async (_: IpcRendererEvent, message: Server) => nats.connect(message);

const natsPublish = async (_: IpcRendererEvent, message: NatsCommonRequest) => nats.publish(message);

const natsRequest = async (_: IpcRendererEvent, message: NatsCommonRequest) => nats.request(message);

const natsDisconnect = async () => nats.disconnect();


export default { natsConnect, natsPublish, natsRequest, natsDisconnect };
