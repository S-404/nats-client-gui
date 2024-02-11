import React, { FC } from 'react';
import { SubjectItem } from '#renderer/store/NatsClientStore.ts';
import MyButton from '#renderer/components/shared/buttons/myButton/MyButton.tsx';
import './subject.scss';


interface ISubject extends SubjectItem {
  isSelected?: boolean;
  onClick?: () => void;
  removeSubject?: () => void;
  saveSubject?: () => void;
}

const Subject: FC<ISubject> = ({
                                 isSelected,
                                 onClick,
                                 removeSubject,
                                 saveSubject,
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
        </div>
      </div>

      <div className="subject-item__body">
        <div className="subject-item__name">
          {subject.name}
        </div>
      </div>

      {isSelected && <hr/>}

      <div className="subject-item__buttons">
        <MyButton
          text={'Remove'}
          color={'red'}
          onClick={removeSubject}
        />
        <MyButton
          text={'Save'}
          color={'green'}
          onClick={saveSubject}
        />
      </div>

    </div>
  );
};

export default Subject;
