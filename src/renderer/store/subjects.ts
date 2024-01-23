import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';

export type SubjectItem = {
  id: string;
  name: string;
  method: 'request' | 'publish';
  payload?: string;
  messages?: string[];
}

class SubjectsStore {
  subjects: SubjectItem[] = [];
  selected: SubjectItem;

  constructor() {
    makeAutoObservable(this);
  }


  addIfNotExists(subject: Omit<SubjectItem, 'id'>) {
    const targetIndex = this.subjects.findIndex(item =>
      item.name === subject.name &&
      item.method === subject.method
    );

    if (targetIndex !== -1) {
      this.update({ ...this.subjects[targetIndex], ...subject });
    } else {
      this.#create(subject);
    }
  }


  #create(subject: Omit<SubjectItem, 'id'>) {
    const newSubject = {
      id: uuid(),
      ...subject
    };
    this.subjects.push(newSubject);
  }

  update(subject: SubjectItem) {
    const targetIndex = this.subjects.findIndex(item => item.id === subject.id);
    if (targetIndex !== -1) {
      this.subjects[targetIndex] = { ...this.subjects[targetIndex], ...subject };
    }
  }

  clear() {
    this.subjects.length = 0;
  }

  remove(id: string) {
    const targetIndex = this.subjects.findIndex(item => item.id === id);
    if (targetIndex !== -1) {
      this.subjects.splice(targetIndex, 1);
    }
  }

  selectSubject(subject: SubjectItem) {
    this.selected = subject;
  }
}

export default new SubjectsStore();
