import LogMessagesStore from '#renderer/store/LogMessagesStore.ts';

export const addLogMessage = (message: string) => {
  LogMessagesStore.addLogMessage(message);
};
