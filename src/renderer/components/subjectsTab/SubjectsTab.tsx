import React, { FC } from 'react';
import { observer } from 'mobx-react';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import NatsClientStore from '#renderer/store/NatsClientStore.ts';
import SubjectsStore from '#renderer/store/SubjectsStore.ts';
import SubjectStore, { SubjectItem } from '#renderer/store/SubjectsStore.ts';
import Subject from './subject/Subject.tsx';
import { useModal } from '#renderer/hooks/useModal.ts';
import IconButton from '#renderer/components/shared/buttons/iconButton/IconButton.tsx';
import SavedSubjectsModal from './savedSubjectsModal/SavedSubjectsModal.tsx';
import SubjectGroupsStore, { SubjectGroup } from '#renderer/store/SubjectGroupsStore.ts';

import './subjectsTab.scss';


export const SubjectsTab: FC = observer(() => {
  const { subjects, selectedSubject } = SubjectsStore;
  const { isOpened, open, close } = useModal();

  const selectSubject = (id: string) => {
    SubjectsStore.setSelectedSubject(id);
  };

  const addSubject = () => {
    const newSubject = SubjectsStore.addNewSubject();
    selectSubject(newSubject.id);
  };

  const removeFromList = (id: string) => {
    SubjectsStore.removeSubjectFromList(id);
  };

  const removeFromStore = (id: string) => {
    SubjectsStore.removeSubjectFromStore(id);
  };

  const saveToStore = (subject: SubjectItem) => {
    SubjectStore.saveSubject(subject.id);
  };

  const clearSubjects = () => {
    for (const subject of subjects) {
      SubjectsStore.removeSubjectFromList(subject.id);
    }
    NatsClientStore.clearState();
  };

  const addSavedSubject = async (items: SubjectItem[]) => {
    for (const item of items) {
      await SubjectsStore.addSavedSubject(item);
    }
    close();
  };

  const findSubjectGroup = (groupId: string | undefined): SubjectGroup | undefined => {
    if (groupId) {
      return SubjectGroupsStore.groups.find(item => item.id === groupId);
    }
  };

  return (
    <TabContainer name={'Subjects'}>
      <div className={'subjects-tab-container'}>

        <div className={'subjects-tab-container__buttons'}>
          <IconButton
            onClick={addSubject}
            iconType={'add'}
            title={'Add Subject'}
            bordered
            iconModifiers={!subjects?.length && ['ping', 'green']}
          />
          <IconButton
            onClick={open}
            iconType={'search'}
            title={'Search Subject'}
            bordered
          />
          <IconButton
            onClick={clearSubjects}
            iconType={'broom'}
            title={'Clear Subject List'}
            bordered
          />
        </div>

        <div className={'subjects-tab-container__subject-list'}>
          {subjects.map((item) => (
            <div
              key={`subject_${item.id}`}
              className={
                `subject-list-item ${
                  selectedSubject?.id === item.id ?
                    'subject-list-item_selected' :
                    ''
                }`}
            >
              <div className={'subject-list-item__subject'}>
                <Subject
                  onClick={() => selectSubject(item.id)}
                  isSelected={selectedSubject?.id === item.id}
                  group={findSubjectGroup(item.groupId)}
                  {...item}
                />
              </div>
              <div className="subject-list-item__buttons">
                <div className="buttons-items">
                  {item.name && (
                    <IconButton
                      onClick={() => saveToStore({ ...item })}
                      iconType={'save'}
                      iconModifiers={item.hasChanges && ['green']}
                      title={'Save subject and payload'}
                    />
                  )}
                  <IconButton
                    onClick={() => removeFromList(item.id)}
                    iconType={'clear'}
                    title={'Remove from list'}
                  />
                </div>
              </div>
            </div>

          ))}
        </div>

        <SavedSubjectsModal
          closeModal={close}
          isModalOpened={isOpened}
          onSelect={addSavedSubject}
        />

      </div>
    </TabContainer>
  );
});

