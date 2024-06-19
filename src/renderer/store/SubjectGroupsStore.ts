import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';
import { appActionDispatcher } from '#renderer/bridge';
import { CSSProperties } from 'react';
import { cloneObject } from '#renderer/utils/cloneObject.ts';

const SUBJECT_GROUPS = 'subjectGroups';

export type SubjectGroupStyle = Pick<CSSProperties, 'backgroundColor' | 'color'>

export type SubjectGroup = {
  id: string;
  name: string;
  style: SubjectGroupStyle
}

class SubjectGroupsStore {
  selectedSubjectGroupId: string | null = null;
  groups: SubjectGroup[] = [];
  defaultStyle: SubjectGroupStyle = {
    color: 'black',
    backgroundColor: 'grey',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedSubjectGroupId = (id: string | null) => {
    this.selectedSubjectGroupId = id;
  };

  async loadFromStore() {
    this.setGroups(await this.#listFromStore());
  }

  async #listFromStore(): Promise<SubjectGroup[]> {
    const storedSubjectGroups = await appActionDispatcher('storeGet', SUBJECT_GROUPS);
    if (storedSubjectGroups) {
      return Object
        .keys(storedSubjectGroups)
        .reduce((acc: SubjectGroup[], key: string) => {
          acc.push(storedSubjectGroups[key]);
          return acc;
        }, []);
    }
    return [];
  }

  setGroups(groups: SubjectGroup[]) {
    this.groups = groups;
  }

  async create() {
    const newGroup: SubjectGroup = {
      id: uuid(),
      name: 'new',
      style: this.defaultStyle,
    };

    this.groups.push(newGroup);

    await this.save(newGroup.id);

    return newGroup;
  }

  async update(id: string, data: Partial<Omit<SubjectGroup, 'id'>>) {
    const group = this.groups.find((item) => item.id === id);

    if (group) {
      for (const key in data) {
        group[key] = data[key];
      }
    }
  }

  async delete(id: string) {
    this.groups = this.groups.filter(item => item.id !== id);
    await appActionDispatcher('storeDelete', `${SUBJECT_GROUPS}.${id}`);
  }

  async save(id: string) {
    const group = this.groups.find((item) => item.id === id);
    if (group) {
      await appActionDispatcher('storeSave', {
        [`${SUBJECT_GROUPS}.${group.id}`]: cloneObject(group),
      });
    }
  }
}

const subjectGroupsStore = new SubjectGroupsStore();
subjectGroupsStore.loadFromStore();

export default subjectGroupsStore;
