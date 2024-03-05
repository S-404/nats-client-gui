import React, { FC, useEffect } from 'react';
import Subject from '#renderer/components/subjectsTab/subject/Subject.tsx';
import NatsClientStore, { SubjectItem } from '#renderer/store/NatsClientStore.ts';
import { appActionDispatcher } from '#renderer/bridge';
import SavedSubjectsStore from '#renderer/store/SavedSubjectsStore.ts';
import { observer } from 'mobx-react';
import Modal from '#renderer/components/shared/modal/Modal.tsx';
import IconButton from '#renderer/components/shared/buttons/iconButton/IconButton.tsx';

import './savedSubjects.scss';

interface ISavedSubjectsModalProps {
  isModalOpened: boolean;
  closeModal: () => void;
}

const SavedSubjectsModal: FC<ISavedSubjectsModalProps> = observer(({ isModalOpened, closeModal }) => {
  const { savedSubjects } = SavedSubjectsStore;

  const removeFromStore = (id: string) => {
    SavedSubjectsStore.removeSavedSubject(id);
    appActionDispatcher('storeDelete', `subjects.${id}`);
  };

  const loadSubjectFromStore = (subject: SubjectItem) => {
    NatsClientStore.addSubjectIfNotExists({ ...subject });
    NatsClientStore.setSelectedSubject(subject.id);
    closeModal();
  };

  useEffect(() => {
    const loadSavedSubjects = async () => {
      const storedSubjects = await appActionDispatcher('storeGet', 'subjects');
      if (storedSubjects) {
        const result = Object
          .keys(storedSubjects)
          .reduce((acc: SubjectItem[], key: string) => {
            acc.push({ ...storedSubjects[key] });
            return acc;
          }, []);

        SavedSubjectsStore.setSavedSubjects(result);
      }
    };

    loadSavedSubjects();
  }, []);

  return (
    <Modal
      isModalOpen={isModalOpened}
      onClose={closeModal}
      title={'Load Subject'}
    >
      <div className={'saved-subjects'}>
        {savedSubjects.map((item) => (
          <div
            key={item.id}
            className={'saved-subjects__subject'}
          >
            <Subject
              onClick={() => loadSubjectFromStore(item)}
              {...item}
            />
            <div className={'subject__remove-button'}>
              <IconButton onClick={() => removeFromStore(item.id)} iconType={'remove'}/>
            </div>
          </div>

        ))}
      </div>
    </Modal>
  );
});

export default SavedSubjectsModal;
