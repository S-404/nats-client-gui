import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';

export type SubjectItem = {
  id: string;
  name: string;
  method: 'request' | 'publish' | 'subscribe';
  payload?: string;
  isSubscribed?: boolean;
  hasChanges?: boolean;
  isSaved?: boolean;
}

export type ClientMessage = {
  subjectId: string,
  message: string
}

class NatsClientStore {
  isConnected: boolean = false;
  subjects: SubjectItem[] = [];
  messages: ClientMessage[] = [];
  selectedSubject?: SubjectItem;
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

  updateSubject(id: string, newData: Partial<SubjectItem>): void {
    const targetIndex = this.subjects.findIndex(item => item.id === id);

    if (targetIndex !== -1) {
      const currentSubjectData = this.subjects[targetIndex];
      this.subjects[targetIndex] = {
        ...currentSubjectData,
        ...newData,
        hasChanges: this.#hasChanges(currentSubjectData, newData),
      };
    }
  }

  #hasChanges(currentSubjectData: SubjectItem, newSubjectData: Partial<SubjectItem>): boolean {
    return !currentSubjectData.isSaved
      || (newSubjectData.payload
        && currentSubjectData.payload !== newSubjectData.payload)
      || (newSubjectData.name
        && currentSubjectData.name !== newSubjectData.name)
      || (newSubjectData.method
        && currentSubjectData.method !== newSubjectData.method);
  }

  removeSubject(id: string) {
    const targetIndex = this.subjects.findIndex(item => item.id === id);
    if (targetIndex !== -1) {
      this.subjects.splice(targetIndex, 1);
    }
    this.clearSubjectMessages(id);
    this.removeSubscriber(id);
    this.selectedSubject = null;
  }

  setSelectedSubject(id: string | null) {
    const targetIndex = this.subjects.findIndex((item) => item.id === id);
    this.selectedSubject = targetIndex !== -1 ? this.subjects[targetIndex] : null;
  }

  createSubject(subject: Omit<SubjectItem, 'id'>) {
    const newSubject = {
      id: uuid(),
      hasChanges: true,
      isSaved: false,
      ...subject,
    };
    this.subjects.push(newSubject);
    return newSubject;
  }

  addSubjectIfNotExists(subject: SubjectItem) {
    const target = this.subjects.find(item => item.id === subject.id);
    if (!target) {
      subject.hasChanges = false;
      subject.isSaved = true;
      this.subjects.push(subject);
    }
  }

  saveSubject(id: string): void {
    const targetIndex = this.subjects.findIndex(item => item.id === id);

    if (targetIndex !== -1) {
      this.subjects[targetIndex] = {
        ...this.subjects[targetIndex],
        hasChanges: false,
        isSaved: true,
      };
    }
  }

  clearState(isFull: boolean = false) {
    this.messages = [];
    this.selectedSubject = null;
    this.subscribers = [];

    if (isFull) {
      this.subjects = [];
    }
  }
}

export default new NatsClientStore();
