import LogMessagesStore, { LoggerMessageType } from '#renderer/store/LogMessagesStore.ts';

export const addLogMessage = (message: LoggerMessageType) => {
  LogMessagesStore.addLogMessage(message);
};
