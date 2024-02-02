import { makeAutoObservable } from 'mobx';

class LogMessagesStore {

  logMessages: string[];

  constructor() {
    this.logMessages = [];
    makeAutoObservable(this);
  }

  addLogMessage(message: string) {
    this.logMessages.push(message);
    if (this.logMessages.length > 1000) {
      this.logMessages = this.logMessages.slice(100);
    }
  }

  clear() {
    this.logMessages.length = 0;
  }
}

export default new LogMessagesStore();
