import React, { FC } from 'react';
import './removeIcon.css';

interface IRemoveIconProps {
  color?: 'grey' | 'red';
}

const RemoveIcon: FC<IRemoveIconProps> = ({ color = 'red' }) => {
  return (
    <div className={`remove-icon remove-icon_${color}`}/>
  );
};

export default RemoveIcon;
