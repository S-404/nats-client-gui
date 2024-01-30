import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';

export type SubjectItem = {
  id: string;
  name: string;
  method: 'request' | 'publish';
  payload?: string;
}

export type ClientMessage = {
  subjectId: string,
  message: string
}

class NatsClientStore {
  isConnected: boolean = false;
  subjects: SubjectItem[] = [];
  messages: ClientMessage[] = [];
  selectedId: string | null;

  constructor() {
    makeAutoObservable(this);
  }

  clearSubjectMessages(subjectId: string) {
    this.messages = this.messages.filter((item) => item.subjectId !== subjectId);
  }

  addMessage(message: ClientMessage) {
    this.messages.push(message);
  }

  setIsConnected(value: boolean) {
    this.isConnected = value;
    if (!value) {
      this.#clearState();
    }
  }

  addSubjectIfNotExists(subject: Omit<SubjectItem, 'id'>): SubjectItem {
    const targetIndex = this.subjects.findIndex(item =>
      item.name === subject.name
    );

    if (targetIndex !== -1) {
      this.subjects[targetIndex] = { ...this.subjects[targetIndex], ...subject };
      return this.subjects[targetIndex];
    } else {
      return this.#createSubject(subject);
    }
  }

  removeSubject(id: string) {
    const targetIndex = this.subjects.findIndex(item => item.id === id);
    if (targetIndex !== -1) {
      this.subjects.splice(targetIndex, 1);
    }
  }

  setSelectedId(id: string | null) {
    this.selectedId = id;
  }

  #createSubject(subject: Omit<SubjectItem, 'id'>) {
    const newSubject = {
      id: uuid(),
      ...subject
    };
    this.subjects.push(newSubject);
    return newSubject;
  }

  #clearState() {
    this.subjects = [];
    this.messages = [];
    this.selectedId = null;
  }
}

export default new NatsClientStore();