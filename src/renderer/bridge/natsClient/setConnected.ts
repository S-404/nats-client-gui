import NatsClientStore from '#renderer/store/NatsClientStore.ts';

export const setConnected = (value: boolean) => {
  NatsClientStore.setIsConnected(value);
};
