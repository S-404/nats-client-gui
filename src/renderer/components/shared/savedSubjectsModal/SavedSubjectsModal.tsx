import React, { FC, useEffect, useMemo, useState } from 'react';
import Modal from '#renderer/components/shared/modal/Modal.tsx';
import SubjectsStore, { SubjectItem } from '#renderer/store/SubjectsStore.ts';
import { observer } from 'mobx-react';
import IconButton from '#renderer/components/shared/buttons/iconButton/IconButton.tsx';
import MyInput from '#renderer/components/shared/inputs/myInput/MyInput.tsx';
import Subject from '#renderer/components/subjectsTab/subject/Subject.tsx';

import './savedSubjectsModal.scss';


interface ISavedSubjectsModalProps {
  isModalOpened: boolean;
  closeModal: () => void;
  onSelect?: (subjectId: SubjectItem) => void;
  showOnlyNames?: boolean;
}


const SavedSubjectsModal: FC<ISavedSubjectsModalProps> = observer(({
                                                                     isModalOpened,
                                                                     closeModal,
                                                                     onSelect,
                                                                     showOnlyNames = true,
                                                                   }) => {
  const { listSavedSubjects, subjects } = SubjectsStore;
  const [savedSubjects, setSavedSubjects] = useState<SubjectItem[]>([]);
  const [filter, setFilter] = useState('');

  const filteredSavedSubjects = useMemo(() => {
    if (!filter) {
      return savedSubjects;
    }
    return savedSubjects.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
      && item.isSaved === true,
    );
  }, [filter, savedSubjects, subjects]);


  const removeFromStore = async (subject: SubjectItem) => {
    await SubjectsStore.removeSubjectFromStore(subject.id);
    setSavedSubjects(await listSavedSubjects());
  };

  useEffect(() => {
    if (!isModalOpened) return;

    const loadSubjects = async () => {
      setSavedSubjects(await listSavedSubjects());
    };
    loadSubjects();
  }, [listSavedSubjects, isModalOpened]);

  return (
    <Modal
      isModalOpen={isModalOpened}
      onClose={closeModal}
      title={'Published subjects history'}
    >

      <div className={'saved-subjects-list'}>
        <div className={'saved-subjects-list__search'}>
          <MyInput
            text={filter}
            title={'search'}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className={'saved-subjects-list__saved-subjects'}>
          {filteredSavedSubjects.map(item => (
            <div
              key={`item_${item.name}`}
              onClick={() => onSelect && onSelect(item)}
              className={'saved-subject__item'}
            >
              {showOnlyNames ?
                <div className={'saved-subject__item_small'}>
                  <p>{item.name}</p>
                </div>
                :
                <Subject{...item}/>
              }
              <div className={'saved-subject__remove-button'}>
                <IconButton
                  onClick={() => removeFromStore(item)}
                  iconType={'remove'}
                  iconModifiers={['red']}
                />
              </div>
            </div>
          ))}
        </div>
        {!filteredSavedSubjects.length && (
          <p>Not found</p>
        )}
      </div>
    </Modal>
  );
});

export default SavedSubjectsModal;
