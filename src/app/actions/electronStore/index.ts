import { IpcRendererEvent } from 'electron';
import store from '#lib/electronStore.ts';

const electronStoreActions = {
  storeSave: (_: IpcRendererEvent, message: { [key: string]: string }) => store.set(message),
  storeGet: (_: IpcRendererEvent, message: string) => store.get(message),
  storeDelete: (_: IpcRendererEvent, message: string) => store.delete(message),
};

export default electronStoreActions;
