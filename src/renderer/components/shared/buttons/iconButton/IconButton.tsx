import React, { FC, MouseEvent } from 'react';
import RemoveIcon from '#renderer/components/shared/buttons/iconButton/icons/removeIcon/RemoveIcon.tsx';
import './iconButton.scss';


interface IIconButton {
  onClick: () => void;
  iconType: 'remove';
}

const IconButton: FC<IIconButton> = ({ onClick, iconType }) => {

  const onClickButtonHandler = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button
      onClick={onClickButtonHandler}
      className={'icon-button'}
    >
      {iconType === 'remove' && (
        <RemoveIcon/>
      )}
    </button>
  );
};

export default IconButton;
