import React, { FC } from 'react';
import { SubjectItem } from '#renderer/store/NatsClientStore.ts';
import './subject.scss';


interface ISubject extends SubjectItem {
  isSelected?: boolean;
  onClick?: () => void;
}

const Subject: FC<ISubject> = ({
                                 isSelected,
                                 onClick,
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
          {subject?.hasChanges && ' * '}
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
