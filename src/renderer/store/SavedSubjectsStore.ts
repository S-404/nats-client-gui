import { makeAutoObservable } from 'mobx';
import { SubjectItem } from '#renderer/store/NatsClientStore.ts';

class SavedSubjectsStore {

  savedSubjects: SubjectItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setSavedSubjects(subjects: SubjectItem[]) {
    this.savedSubjects = subjects;
  }

  addSavedSubject(subject: SubjectItem) {
    const targetIndex = this.savedSubjects.findIndex(item => item.id === subject.id);
    if (targetIndex !== -1) {
      this.savedSubjects[targetIndex] = { ...subject };
    } else {
      this.savedSubjects.push(subject);
    }
  }

  removeSavedSubject(id: string) {
    this.savedSubjects = this.savedSubjects.filter(item => item.id !== id);
  }


}


export default new SavedSubjectsStore();
