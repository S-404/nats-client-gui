import React, { FC } from 'react';
import XIcon from '/icon-x.png';
import './removeIcon.css';

interface IRemoveIconProps {
  color?: 'grey' | 'red';
}

const RemoveIcon: FC<IRemoveIconProps> = ({ color = 'red' }) => {
  return (
    <img
      className={`remove-icon remove-icon_${color}`}
      src={XIcon}
      alt={'remove'}
    />
  );
};

export default RemoveIcon;
