import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';
import { appActionDispatcher } from '#renderer/bridge';

export type SubjectItem = {
  id: string;
  name: string;
  method: 'request' | 'publish' | 'subscribe';
  payload?: string;
  hasChanges?: boolean;
  isSaved?: boolean;
}

class SubjectsStore {
  subjects: SubjectItem[] = [];
  selectedSubject: SubjectItem | null;

  constructor() {
    makeAutoObservable(this);
  }

  async listSavedSubjects(): Promise<SubjectItem[]> {
    const storedSubjects = await appActionDispatcher('storeGet', 'subjects');
    if (storedSubjects) {
      return Object
        .keys(storedSubjects)
        .reduce((acc: SubjectItem[], key: string) => {
          acc.push({
            ...storedSubjects[key],
            hasChanges: false,
            isSaved: true, // обратная совместимость :D
          });
          return acc;
        }, []);
    }
    return [];
  }

  setSubjects(subjects: SubjectItem[]) {
    this.subjects = subjects;
  }

  addNewSubject() {
    const newSubject: SubjectItem = {
      id: uuid(),
      name: '',
      method: 'request',
      isSaved: false,
      hasChanges: true,
    };
    this.subjects.push(newSubject);

    return newSubject;
  }

  removeSubjectFromList(id: string) {
    const subject = this.subjects.find(item => item.id === id);
    if (subject) {
      this.subjects = this.subjects.filter(item => item.id !== subject.id);
      if (this.selectedSubject?.id === subject.id) {
        this.setSelectedSubject(null);
      }

      appActionDispatcher('natsUnsubscribe', { subject: subject.name });
    }
  }

  async removeSubjectFromStore(id: string) {
    this.subjects = this.subjects.filter(item => item.id !== id);
    await appActionDispatcher('storeDelete', `subjects.${id}`);
  }

  updateSubject(id: string, newData: Partial<SubjectItem>): void {
    const subject = this.subjects.find(item => item.id === id);
    if (subject) {
      for (const key of Object.keys(newData)) {
        subject[key] = newData[key];
      }
      subject.hasChanges = true;
    }
  }

  setSelectedSubject(id: string | null) {
    const subject = this.subjects.find(item => item.id === id);
    this.selectedSubject = subject && id ? subject : null;
  }

  saveSubject(id: string): void {
    const subject = this.subjects.find(item => item.id === id);

    if (subject) {
      if (!subject.name) {
        console.warn('subject should has name');
        return;
      }

      subject.hasChanges = false;
      subject.isSaved = true;

      appActionDispatcher('storeSave', {
        [`subjects.${subject.id}`]: { ...subject },
      });
    }
  }

  async addSavedSubject(savedSubject: SubjectItem) {
    const subject = this.subjects.find(item => item.id === savedSubject.id);

    if (!subject) {
      this.subjects.push(savedSubject);
    }

    this.setSelectedSubject(savedSubject.id);
  }
}

export default new SubjectsStore();
