import React, { useEffect, useState } from 'react';
import MyInput from '#renderer/components/shared/inputs/myInput/MyInput.tsx';
import AttributeColorSetting from '#renderer/components/subjectGroups/subjectGroupSettings/AttributeColorSetting.tsx';
import SubjectGroupBadge from '#renderer/components/subjectGroups/SubjectGroupBadge.tsx';
import MyButton from '#renderer/components/shared/buttons/myButton/MyButton.tsx';
import SubjectGroupsStore, { SubjectGroup, SubjectGroupStyle } from '#renderer/store/SubjectGroupsStore.ts';
import { cloneObject } from '#renderer/utils/cloneObject.ts';
import { observer } from 'mobx-react';

import './subjectGroupSettings.scss';

const SubjectGroupSettings = observer(({ group }) => {
  const [groupData, setGroupData] = useState<SubjectGroup>();

  const onChangeSubjectGroupValueHandler = async (attr: keyof Pick<SubjectGroup, 'name'>, value: string) => {
    setGroupData({
      ...groupData,
      [attr]: value,
    });
  };

  const onChangeColorHandler = async ({ key, value }: {
    key: keyof SubjectGroupStyle,
    value: string
  }) => {
    setGroupData({
      ...groupData,
      style: {
        ...groupData.style,
        [key]: value,
      },
    });
  };

  const onSaveColorHandler = async () => {
    await SubjectGroupsStore.update(groupData.id, {
      ...groupData,
    });
    await SubjectGroupsStore.save(groupData.id);
    SubjectGroupsStore.setSelectedSubjectGroupId(null);
  };

  const onCancelHandler = async () => {
    SubjectGroupsStore.setSelectedSubjectGroupId(null);
  };

  useEffect(() => {
    setGroupData(cloneObject(group));
  }, [group]);

  if (!groupData) {
    return null;
  }

  return (
    <div className={'subject-group-settings'}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={'subject-group-settings__settings-panel'}
      >
        <div className={'preview'}>
          <p>preview: </p>
          <SubjectGroupBadge group={groupData}/>
        </div>
        <div className={'settings-panel__attribute'}>
          <p>name</p>
          <MyInput
            text={groupData.name}
            maxLength={25}
            onChange={(e) => onChangeSubjectGroupValueHandler(
              'name',
              e.target.value,
            )}
          />
        </div>

        <AttributeColorSetting
          attr={'color'}
          value={groupData.style.color}
          onChange={(color) => onChangeColorHandler({
            key: 'color',
            value: color,
          })}
        />
        <AttributeColorSetting
          attr={'backgroundColor'}
          value={groupData.style.backgroundColor}
          onChange={(color) => onChangeColorHandler({
            key: 'backgroundColor',
            value: color,
          })}
        />
        <div className={'settings-panel__bottom'}>

          <div className={'buttons'}>
            <MyButton
              text={'Apply'}
              onClick={() => onSaveColorHandler()}
              color={'green'}
            />
            <MyButton
              text={'Cancel'}
              onClick={() => onCancelHandler()}
            />
          </div>
        </div>

      </div>
    </div>
  );
});

export default SubjectGroupSettings;
