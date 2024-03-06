import React, { FC, useEffect } from 'react';
import Modal from '#renderer/components/shared/modal/Modal.tsx';
import PublishedSubjectsStore from '#renderer/store/PublishedSubjectsStore.ts';
import { appActionDispatcher } from '#renderer/bridge';
import { observer } from 'mobx-react';
import IconButton from '#renderer/components/shared/buttons/iconButton/IconButton.tsx';

import './publishedSubjectsModal.scss';

interface IPublishedSubjectsModalProps {
  isModalOpened: boolean;
  closeModal: () => void;
}


const PublishedSubjectsModal: FC<IPublishedSubjectsModalProps> = observer(({ isModalOpened, closeModal }) => {
  const { publishedSubjects } = PublishedSubjectsStore;

  const removeFromStore = async (subject: string) => {
    PublishedSubjectsStore.removePublishedSubject(subject);

    const stored: [] = (await appActionDispatcher('storeGet', 'publishedSubjects')) ?? [];
    appActionDispatcher('storeSave', {
      publishedSubjects: stored.filter((item) => item !== subject)
    });
  };

  const loadSubjectFromStore = (subject: string) => {
    PublishedSubjectsStore.setCurrentSubject(subject);
    closeModal();
  };

  useEffect(() => {
    const loadPublishedSubjects = async () => {
      const publishedSubjects = await appActionDispatcher('storeGet', 'publishedSubjects');
      PublishedSubjectsStore.setPublishedSubjects(publishedSubjects ?? []);
    };

    loadPublishedSubjects();
  }, []);

  return (
    <Modal
      isModalOpen={isModalOpened}
      onClose={closeModal}
      title={'Published subjects history'}
    >
      <div className={'saved-published-subjects'}>
        {publishedSubjects.map(item => (
          <div
            className={'saved-published-subjects__published-subject'}
            key={`item_${item}_${Date.now()}`}
            onClick={() => loadSubjectFromStore(item)}
          >
            <div className={'published-subject__item'}>
              <p>{item}</p>
              <div className={'published-subject__remove-button'}>
                <IconButton
                  onClick={() => removeFromStore(item)}
                  iconType={'remove'}
                />
              </div>
            </div>
          </div>

        ))}
      </div>
    </Modal>
  );
});

export default PublishedSubjectsModal;
