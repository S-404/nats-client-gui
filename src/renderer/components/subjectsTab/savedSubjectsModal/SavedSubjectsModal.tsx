import React, { FC, useEffect, useMemo, useState } from 'react';
import Modal from '#renderer/components/shared/modal/Modal.tsx';
import SubjectsStore, { SubjectItem } from '#renderer/store/SubjectsStore.ts';
import { observer } from 'mobx-react';
import IconButton from '#renderer/components/shared/buttons/iconButton/IconButton.tsx';
import MyInput from '#renderer/components/shared/inputs/myInput/MyInput.tsx';
import Subject from '#renderer/components/subjectsTab/subject/Subject.tsx';
import Tabs, { TabsItem } from '#renderer/components/shared/navigation/tabs/Tabs.tsx';
import SubjectGroupsStore from '#renderer/store/SubjectGroupsStore.ts';
import SubjectGroupBadge from '#renderer/components/subjectGroups/SubjectGroupBadge.tsx';

import './savedSubjectsModal.scss';


interface ISavedSubjectsModalProps {
  isModalOpened: boolean;
  closeModal: () => void;
  onSelect?: (subjectIds: SubjectItem[]) => void;
}

const savedSubjectTabs: TabsItem[] = [
  { id: '1', value: 'subject', view: 'Subjects' },
  { id: '2', value: 'group', view: 'Groups' },
];

const SavedSubjectsModal: FC<ISavedSubjectsModalProps> = observer(({
                                                                     isModalOpened,
                                                                     closeModal,
                                                                     onSelect,
                                                                   }) => {
  const { listSavedSubjects, subjects } = SubjectsStore;
  const { groups } = SubjectGroupsStore;
  const [savedSubjects, setSavedSubjects] = useState<SubjectItem[]>([]);
  const [filter, setFilter] = useState('');

  const [mode, setMode] = useState<'subject' | 'group'>('subject');

  const filteredSavedSubjects = useMemo(() => {
    if (!filter) {
      return savedSubjects;
    }
    return savedSubjects.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
      && item.isSaved === true,
    );
  }, [filter, savedSubjects, subjects]);

  const filteredGroups = useMemo(() => {
    if (!filter) {
      return groups;
    }
    return groups.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [filter, groups]);

  const onSelectTabHandler = (tabName: string) => {
    switch (tabName) {
      case 'subject':
        setMode('subject');
        break;
      case 'group':
        setMode('group');
        break;
    }
  };

  const removeFromStore = async (subject: SubjectItem) => {
    await SubjectsStore.removeSubjectFromStore(subject.id);
    setSavedSubjects(await listSavedSubjects());
  };

  const onSelectSubjectHandler = (subject: SubjectItem) => {
    onSelect([subject]);
  };

  const onSelectGroupHandler = (groupId: string) => {
    onSelect(savedSubjects.filter(subject => subject.groupId === groupId));
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
      title={'Saved subjects'}
    >
      <div className={'saved-subjects'}>
        <div className={'saved-subjects__header'}>
          <Tabs
            items={savedSubjectTabs}
            onSelectItem={onSelectTabHandler}
            selectedId={savedSubjectTabs.find(item => item.value === mode)?.id}
          />
          <MyInput
            text={filter}
            title={'Search'}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        {mode === 'group' ?
          (<div className={'saved-subjects__subject-groups'}>
            <div className={'subject-groups__subject-groups-list'}>
              {filteredGroups.map(group => (
                <div
                  onClick={() => onSelectGroupHandler(group.id)}
                  className={'subject-groups-list-item'}
                  key={`subject-group_${group.id}`}
                >
                  <SubjectGroupBadge group={group}/>
                  <div className={'subject-groups-list-item__counter'}>
                    x{savedSubjects.filter(item => item.groupId === group.id).length}
                  </div>
                </div>
              ))}
              {!filteredGroups.length && (
                <p>Not found</p>
              )}
            </div>
          </div>)
          :
          (<div className={'saved-subjects__subjects'}>
            <div className={'subjects__subject-list'}>
              {filteredSavedSubjects.map(item => (
                <div
                  key={`subject_${item.id}`}
                  onClick={() => onSelectSubjectHandler(item)}
                  className={'subject-list__subject-list-item'}
                >
                  <Subject
                    group={groups.find(group => group.id === item.groupId)}
                    {...item}
                  />
                  <div className={'subject-list-item__remove-button'}>
                    <IconButton
                      onClick={() => removeFromStore(item)}
                      iconType={'remove'}
                      iconModifiers={['red']}
                    />
                  </div>
                </div>
              ))}
              {!filteredSavedSubjects.length && (
                <p>Not found</p>
              )}
            </div>
          </div>)
        }
      </div>
    </Modal>
  );
});

export default SavedSubjectsModal;
