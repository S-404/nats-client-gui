import { makeAutoObservable } from 'mobx';

export type ClientMessage = {
  subjectId: string,
  message: string
}

class NatsClientStore {
  isConnected: boolean = false;
  messages: ClientMessage[] = [];
  subscribers: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addSubscriber(id: string) {
    this.subscribers.push(id);
  }

  removeSubscriber(id: string) {
    this.subscribers = this.subscribers.filter(item => item !== id);
  }

  clearSubjectMessages(subjectId: string) {
    this.messages = this.messages.filter((item) => item.subjectId !== subjectId);
  }

  addMessage(message: ClientMessage) {
    this.messages.push(message);
    if (this.messages.length > 600) {
      this.messages = this.messages.slice(100);
    }
  }

  setIsConnected(value: boolean) {
    this.isConnected = value;
    if (!value) {
      this.clearState();
    }
  }

  clearState() {
    this.messages = [];
    this.subscribers = [];
  }
}

export default new NatsClientStore();
