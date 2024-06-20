import { makeAutoObservable } from 'mobx';

export type LoggerMessageType = {
  time: string;
  message: string;
  subject?: string;
  type: 'info' | 'warn' | 'error' | 'success'
}

class LogMessagesStore {

  logMessages: LoggerMessageType[];
  subjectCounter: { [subject: string]: number } = {};

  constructor() {
    this.logMessages = [];
    makeAutoObservable(this);
  }

  addLogMessage(message: LoggerMessageType) {
    this.logMessages.push(message);
    this.#incrementSubjectCounter(message);

    if (this.logMessages.length > 600) {
      this.logMessages = this.logMessages.slice(100);
    }
  }

  #incrementSubjectCounter(message: LoggerMessageType) {
    if (message.subject) {
      if (!this.subjectCounter[message.subject]) {
        this.subjectCounter[message.subject] = 0;
      }
      this.subjectCounter[message.subject]++;
    }
  }

  clear() {
    this.logMessages.length = 0;
    this.subjectCounter = {};
  }
}

export default new LogMessagesStore();
