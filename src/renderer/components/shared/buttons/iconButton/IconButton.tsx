import React, { FC } from 'react';
import RemoveIcon from '#renderer/components/shared/buttons/iconButton/icons/removeIcon/RemoveIcon.tsx';
import './iconButton.scss';


interface IIconButton {
  onClick: () => void;
  iconType: 'remove';
}

const IconButton: FC<IIconButton> = ({ onClick, iconType }) => {
  return (
    <button
      onClick={onClick}
      className={'icon-button'}
    >
      {iconType === 'remove' && (
        <RemoveIcon/>
      )}
    </button>
  );
};

export default IconButton;
