import React, { FC, useMemo, useState } from 'react';
import SubjectGroupsStore, { SubjectGroup, SubjectGroupStyle } from '#renderer/store/SubjectGroupsStore.ts';
import SubjectGroupBadge from '#renderer/components/subjectGroups/SubjectGroupBadge.tsx';
import { observer } from 'mobx-react';
import MyButton from '#renderer/components/shared/buttons/myButton/MyButton.tsx';
import MyInput from '#renderer/components/shared/inputs/myInput/MyInput.tsx';
import IconButton from '#renderer/components/shared/buttons/iconButton/IconButton.tsx';
import AttributeColorSetting from '#renderer/components/subjectGroups/AttributeColorSetting.tsx';

import './subjectGroups.scss';

interface ISubjectGroups {
  onSelect: (groupId: string) => void;
}

const SubjectGroups: FC<ISubjectGroups> = observer(({ onSelect }) => {
  const { groups } = SubjectGroupsStore;
  const [filter, setFilter] = useState<string>('');
  const [selectedGroupId, setSelectedGroupId] = useState<string>();

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

  const onChangeSubjectGroupValueHandler = async (groupId: string, attr: keyof Pick<SubjectGroup, 'name'>, value: string) => {
    await SubjectGroupsStore.update(groupId, {
      [attr]: value,
    });
  };

  const onChangeColorHandler = async ({ group, key, value }: {
    group: SubjectGroup,
    key: keyof SubjectGroupStyle,
    value: string
  }) => {
    await SubjectGroupsStore.update(group.id, {
      style: {
        ...group.style,
        [key]: value,
      },
    });
  };

  const onSaveColorHandler = async (groupId: string) => {
    await SubjectGroupsStore.save(groupId);
    setSelectedGroupId(null);
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
            key={group.id}
            className={'group-list__list-item'}
          >
            <div className={'list-item__list-item-info'}>
              <div
                onClick={() => onSelect(group.id)}
                className={'list-item-info__badge'}
              >
                <SubjectGroupBadge
                  group={group}
                />
              </div>
              <div className={'list-item-info__buttons'}>
                <div className={'list-item-info__settings_button'}>
                  <IconButton
                    onClick={() => setSelectedGroupId(group.id)}
                    iconType={'settings'}
                  />
                </div>
                <div className={'list-item-info__remove-button'}>
                  <IconButton
                    onClick={() => removeSubjectGroupButtonHandler(group.id)}
                    iconType={'remove'}
                    iconModifiers={['red']}
                  />
                </div>
              </div>
            </div>
            <div className={'list-item__list-item-settings'}>
              {group.id === selectedGroupId && (
                <div className={'list-item-settings__settings-panel'}>
                  <MyInput
                    text={group.name}
                    title={'Group Name'}
                    maxLength={25}
                    onChange={(e) => onChangeSubjectGroupValueHandler(
                      group.id,
                      'name',
                      e.target.value,
                    )}
                  />
                  <AttributeColorSetting
                    attr={'color'}
                    value={group.style.color}
                    onChange={(color) => onChangeColorHandler({
                      group,
                      key: 'color',
                      value: color,
                    })}
                  />
                  <AttributeColorSetting
                    attr={'backgroundColor'}
                    value={group.style.backgroundColor}
                    onChange={(color) => onChangeColorHandler({
                      group,
                      key: 'backgroundColor',
                      value: color,
                    })}
                  />
                  <div className={'buttons'}>
                    <MyButton
                      text={'Apply'}
                      onClick={() => onSaveColorHandler(group.id)}
                      color={'green'}
                    />
                    <MyButton
                      text={'Cancel'}
                      onClick={() => setSelectedGroupId(null)}
                      color={'orange'}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default SubjectGroups;
