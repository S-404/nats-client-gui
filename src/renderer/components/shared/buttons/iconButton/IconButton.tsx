import React, { FC, MouseEvent } from 'react';
import RemoveIcon from '#renderer/components/shared/buttons/iconButton/icons/removeIcon/RemoveIcon.tsx';
import SearchIcon from '#renderer/components/shared/buttons/iconButton/icons/searchIcon/SearchIcon.tsx';
import CopyIcon from '#renderer/components/shared/buttons/iconButton/icons/copyIcon/CopyIcon.tsx';

import './iconButton.scss';



interface IIconButton {
  onClick: () => void;
  iconType: 'remove' | 'search' | 'clear' | 'copy';
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
      {iconType === 'search' && (
        <SearchIcon/>
      )}
      {iconType === 'clear' && (
        <RemoveIcon color={'grey'}/>
      )}
      {iconType === 'copy' && (
        <CopyIcon/>
      )}
    </button>
  );
};

export default IconButton;
