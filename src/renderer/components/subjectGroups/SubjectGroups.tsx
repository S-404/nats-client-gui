import React, { FC, useMemo, useState } from 'react';
import SubjectGroupsStore from '#renderer/store/SubjectGroupsStore.ts';
import SubjectGroupBadge from '#renderer/components/subjectGroups/SubjectGroupBadge.tsx';
import { observer } from 'mobx-react';
import MyButton from '#renderer/components/shared/buttons/myButton/MyButton.tsx';
import MyInput from '#renderer/components/shared/inputs/myInput/MyInput.tsx';
import IconButton from '#renderer/components/shared/buttons/iconButton/IconButton.tsx';
import SubjectGroupSettings from '#renderer/components/subjectGroups/subjectGroupSettings/SubjectGroupSettings.tsx';

import './subjectGroups.scss';

interface ISubjectGroups {
  onSelect: (groupId: string) => void;
}

const SubjectGroups: FC<ISubjectGroups> = observer(({ onSelect }) => {
  const { groups, selectedSubjectGroupId } = SubjectGroupsStore;
  const [filter, setFilter] = useState<string>('');


  const filteredGroups = useMemo(() => {
    if (!filter) {
      return groups;
    }
    return groups.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [groups, filter]);

  const addSubjectGroupButtonHandler = async () => {
    await SubjectGroupsStore.create();
  };

  const removeSubjectGroupButtonHandler = async (groupId: string) => {
    await SubjectGroupsStore.delete(groupId);
  };

  const clickSettingsButtonHandler = (groupId: string) => {
    SubjectGroupsStore.setSelectedSubjectGroupId(groupId === selectedSubjectGroupId ? null : groupId);
  };


  return (
    <div className={'subject-groups'}>
      <div className={'subject-groups__header'}>
        <MyButton
          onClick={addSubjectGroupButtonHandler}
          text={'Create Subject Group'}
          color={'green'}
        />
        <MyInput
          text={filter}
          onChange={(e) => setFilter(e.target.value)}
          title={'Search'}
          clearButton={true}
        />
      </div>
      <div className={'subject-groups__group-list'}>
        {filteredGroups.map(group => (
          <div
            key={`subject-group_${group.id}`}
            className={'group-list__list-item'}
            onClick={() => onSelect(group.id)}
          >
            <div className={'list-item__list-item-info'}>
              <div className={'list-item-info__badge'}>
                <SubjectGroupBadge group={group}/>
              </div>
              <div
                onClick={e => e.stopPropagation()}
                className={'list-item-info__buttons'}
              >
                <div className={'list-item-info__settings_button'}>
                  <IconButton
                    onClick={() => clickSettingsButtonHandler(group.id)}
                    iconType={'settings'}
                  />
                </div>
                {!(selectedSubjectGroupId === group.id) && (
                  <div className={'list-item-info__remove-button'}>
                    <IconButton
                      onClick={() => removeSubjectGroupButtonHandler(group.id)}
                      iconType={'remove'}
                      iconModifiers={['red']}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={'list-item__list-item-settings'}>
              {group.id === selectedSubjectGroupId && (
                <SubjectGroupSettings group={group}/>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default SubjectGroups;
