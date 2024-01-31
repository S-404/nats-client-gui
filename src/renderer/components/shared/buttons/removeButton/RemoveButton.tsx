import React, { FC } from 'react';
import './removeButton.scss';

interface IRemoveButtonProps {
  onClick: () => void;
}

const RemoveButton: FC<IRemoveButtonProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className={'remove-button'}>
      <div className={'remove-button__icon'}/>
    </div>
  );
};

export default RemoveButton;
