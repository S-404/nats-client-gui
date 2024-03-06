import React, { FC, MouseEvent } from 'react';
import RemoveIcon from '#renderer/components/shared/buttons/iconButton/icons/removeIcon/RemoveIcon.tsx';
import './iconButton.scss';
import SearchIcon from '#renderer/components/shared/buttons/iconButton/icons/searchIcon/SearchIcon.tsx';


interface IIconButton {
  onClick: () => void;
  iconType: 'remove' | 'search';
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
    </button>
  );
};

export default IconButton;
