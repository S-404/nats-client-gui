import React, { FC } from 'react';
import { SubjectItem } from '#app/stores/NatsClientStore.ts';
import './subject.scss';

interface ISubject extends SubjectItem {
  isSelected?: boolean;
  onClick?: (subject: SubjectItem) => void;
  removeSubject: (id: string) => void;
}

const Subject: FC<ISubject> = ({ isSelected, onClick, removeSubject, ...subject }) => {
  return (
    <div
      className={`subject-item subject-item${isSelected ? '_selected' : ''}`}
      onClick={() => onClick(subject)}
    >
      <div className="subject-item__header">
        <div className={`subject-item__method subject-item__method_${subject?.method}`}>
          {subject?.method ? subject.method.toUpperCase() : ''}
        </div>
        <div
          className={'subject-item__remove'}
          onClick={() => removeSubject(subject.id)}
        >
          {'X'}
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
