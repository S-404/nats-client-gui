import React, { FC } from 'react';
import { SubjectItem } from '#renderer/store/SubjectsStore.ts';
import SubjectGroupBadge from '#renderer/components/subjectGroups/SubjectGroupBadge.tsx';
import { SubjectGroup } from '#renderer/store/SubjectGroupsStore.ts';

import './subject.scss';


interface ISubject extends SubjectItem {
  isSelected?: boolean;
  onClick?: () => void;
  group?: SubjectGroup,
}

const Subject: FC<ISubject> = ({
                                 isSelected,
                                 onClick,
                                 group,
                                 ...subject
                               }) => {
  return (
    <div
      className={`subject-item subject-item${isSelected ? '_selected' : ''}`}
      onClick={onClick}
    >
      <div className="subject-item__header">
        <div className={`subject-item__method subject-item__method_${subject?.method}`}>
          {subject?.method ? subject.method.toUpperCase() : ''}
          {(!subject?.isSaved || subject?.hasChanges) && ' * '}
          {group && (<SubjectGroupBadge group={group}/>)}
        </div>
      </div>

      <div className="subject-item__body">
        <div className="subject-item__name">
          {subject.name}
        </div>
      </div>
    </div>
  );
};

export default Subject;
