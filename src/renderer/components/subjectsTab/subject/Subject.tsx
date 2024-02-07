import React, { FC } from 'react';
import { SubjectItem } from '#renderer/store/NatsClientStore.ts';
import IconButton from '#renderer/components/shared/buttons/iconButton/IconButton.tsx';
import './subject.scss';

interface ISubject extends SubjectItem {
  isSelected?: boolean;
  onClick?: (subject: SubjectItem) => void;
  removeSubject: (params: { id: string, subject: string }) => void;
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

        <div className="subject-item__buttons">
          <div className="buttons__remove">
            <IconButton
              iconType={'remove'}
              onClick={() => removeSubject({ id: subject.id, subject: subject.name })}/>
          </div>
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
