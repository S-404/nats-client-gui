import { makeAutoObservable } from 'mobx';

class SavedSubjectsStore {

  publishedSubjects: string[] = [];
  currentSubject: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentSubject(subject: string) {
    this.currentSubject = subject;
  }

  setPublishedSubjects(subjects: string[]) {
    this.publishedSubjects = subjects;
  }

  addPublishedSubject(subject: string) {
    const targetIndex = this.publishedSubjects.findIndex(item => item === subject);
    if (targetIndex !== -1) {
      this.publishedSubjects[targetIndex] = subject;
    } else {
      this.publishedSubjects.push(subject);
    }
  }

  removePublishedSubject(subject: string) {
    this.publishedSubjects = this.publishedSubjects.filter(item => item !== subject);
  }
}


export default new SavedSubjectsStore();
