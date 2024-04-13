import React, { FC, MouseEvent } from 'react';
import RemoveIcon from '#renderer/components/shared/buttons/iconButton/icons/removeIcon/RemoveIcon.tsx';
import SearchIcon from '#renderer/components/shared/buttons/iconButton/icons/searchIcon/SearchIcon.tsx';
import CopyIcon from '#renderer/components/shared/buttons/iconButton/icons/copyIcon/CopyIcon.tsx';
import AddIcon from '#renderer/components/shared/buttons/iconButton/icons/addIcon/AddIcon.tsx';
import DotsIcon from '#renderer/components/shared/buttons/iconButton/icons/dotsIcon/DotsIcon.tsx';
import BroomIcon from '#renderer/components/shared/buttons/iconButton/icons/broomIcon/BroomIcon.tsx';
import ListIcon from '#renderer/components/shared/buttons/iconButton/icons/listIcon/listIcon.tsx';
import MessageIcon from '#renderer/components/shared/buttons/iconButton/icons/messageIcon/MessageIcon.tsx';
import MessagesIcon from '#renderer/components/shared/buttons/iconButton/icons/messagesIcon/MessagesIcon.tsx';
import SaveIcon from '#renderer/components/shared/buttons/iconButton/icons/saveIcon/saveIcon.tsx';
import './iconButton.scss';


interface IIconButton {
  onClick: () => void;
  iconType: 'remove' | 'search' | 'clear' | 'copy' | 'add' | 'dots' | 'broom' | 'list' | 'message' | 'messages' | 'save';
  title?: string;
  bordered?: boolean;
}

const IconButton: FC<IIconButton> = ({
                                       onClick,
                                       iconType,
                                       title,
                                       bordered = false
                                     }) => {

  const onClickButtonHandler = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button
      onClick={onClickButtonHandler}
      className={`icon-button ${bordered ? 'icon-button_bordered' : ''}`}
      title={title}
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
      {iconType === 'add' && (
        <AddIcon/>
      )}
      {iconType === 'dots' && (
        <DotsIcon/>
      )}
      {iconType === 'broom' && (
        <BroomIcon/>
      )}
      {iconType === 'list' && (
        <ListIcon/>
      )}
      {iconType === 'message' && (
        <MessageIcon/>
      )}
      {iconType === 'messages' && (
        <MessagesIcon/>
      )}
      {iconType === 'save' && (
        <SaveIcon/>
      )}
    </button>
  );
};

export default IconButton;
