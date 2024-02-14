import { makeAutoObservable } from 'mobx';

class Modals {
  aboutModal: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAboutModal(value: boolean) {
    this.aboutModal = value;
  }

}

export default new Modals()
