import React, { FC, useEffect, useMemo, useState } from 'react';
import Modal from '#renderer/components/shared/modal/Modal.tsx';
import PublishedSubjectsStore from '#renderer/store/PublishedSubjectsStore.ts';
import { appActionDispatcher } from '#renderer/bridge';
import { observer } from 'mobx-react';
import IconButton from '#renderer/components/shared/buttons/iconButton/IconButton.tsx';
import MyInput from '#renderer/components/shared/inputs/myInput/MyInput.tsx';

import './publishedSubjectsModal.scss';


interface IPublishedSubjectsModalProps {
  isModalOpened: boolean;
  closeModal: () => void;
  onSelect: (subject: string) => void;
}


const PublishedSubjectsModal: FC<IPublishedSubjectsModalProps> = observer(({ isModalOpened, closeModal, onSelect }) => {
  const { publishedSubjects } = PublishedSubjectsStore;
  const [filter, setFilter] = useState('');

  const filteredPublishedSubjects = useMemo(() => {
    if (!filter) {
      return publishedSubjects;
    }
    return publishedSubjects.filter(item => item.toLowerCase().includes(filter.toLowerCase()));
  }, [filter, publishedSubjects]);


  const removeFromStore = async (subject: string) => {
    PublishedSubjectsStore.removePublishedSubject(subject);

    const stored: [] = (await appActionDispatcher('storeGet', 'publishedSubjects')) ?? [];
    appActionDispatcher('storeSave', {
      publishedSubjects: stored.filter((item) => item !== subject)
    });
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
        <div className={'saved-published-subjects__search'}>
          <MyInput
            text={filter}
            title={'search'}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className={'saved-published-subjects__published-subjects'}>
          {filteredPublishedSubjects.map(item => (
            <div
              key={`item_${item}`}
              onClick={() => onSelect(item)}
              className={'published-subject__item'}
            >
              <p>{item}</p>
              <div className={'published-subject__remove-button'}>
                <IconButton
                  onClick={() => removeFromStore(item)}
                  iconType={'remove'}
                />
              </div>
            </div>
          ))}
        </div>
        {!filteredPublishedSubjects.length && (
          <p>Not found</p>
        )}
      </div>
    </Modal>
  );
});

export default PublishedSubjectsModal;
