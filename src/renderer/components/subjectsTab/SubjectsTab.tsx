import React, { FC } from 'react';
import { observer } from 'mobx-react';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import NatsClientStore, { SubjectItem } from '#renderer/store/NatsClientStore.ts';
import SavedSubjectsModal from '#renderer/components/subjectsTab/savedSubjects/SavedSubjectsModal.tsx';
import SavedSubjectsStore from '#renderer/store/SavedSubjectsStore.ts';
import Subject from './subject/Subject.tsx';
import { appActionDispatcher } from 'src/renderer/bridge';
import { useModal } from '#renderer/hooks/useModal.ts';
import IconButton from '#renderer/components/shared/buttons/iconButton/IconButton.tsx';

import './subjectsTab.scss';


export const SubjectsTab: FC = observer(() => {
  const { subjects, selectedSubject } = NatsClientStore;
  const { isOpened, open, close } = useModal();

  const selectSubject = (subject: SubjectItem) => {
    NatsClientStore.setSelectedSubject(subject.id);
  };

  const addSubject = () => {
    const newSubject = NatsClientStore.createSubject({
      method: 'request',
      name: '',
      hasChanges: true,
    });
    selectSubject(newSubject);
  };

  const remove = ({ id, subject }: { id: string, subject: string }) => {
    NatsClientStore.removeSubject(id);
    appActionDispatcher('natsUnsubscribe', { subject });
  };

  const saveToStore = (subject: SubjectItem) => {
    SavedSubjectsStore.addSavedSubject(subject);
    NatsClientStore.saveSubject(subject.id)
    appActionDispatcher('storeSave', {
      [`subjects.${subject.id}`]: subject,
    });
  };

  const clearSubjects = () => {
    NatsClientStore.clearState(true);
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
              key={item.id}
              className={
                `subject-list-item ${
                  selectedSubject?.id === item.id ?
                    'subject-list-item_selected' :
                    ''
                }`}
            >
              <div className={'subject-list-item__subject'}>
                <Subject
                  onClick={() => selectSubject(item)}
                  isSelected={selectedSubject?.id === item.id}
                  {...item}
                />
              </div>
              <div className="subject-list-item__buttons">
                <div className="buttons-items">
                  <IconButton
                    onClick={() => saveToStore({ ...item })}
                    iconType={'save'}
                    iconModifiers={item.hasChanges && ['green']}
                    title={'Save subject and payload'}

                  />
                  <IconButton
                    onClick={() => remove({ id: item.id, subject: item.name })}
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
        />

      </div>
    </TabContainer>
  );
});

