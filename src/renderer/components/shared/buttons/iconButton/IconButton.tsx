import React, { FC, MouseEvent } from 'react';
import './iconButton.scss';
import { iconMap } from '#renderer/components/shared/buttons/iconButton/iconMap.ts';


interface IIconButton {
  onClick: () => void;
  iconType: keyof typeof iconMap;
  title?: string;
  bordered?: boolean;
  iconModifiers?: string[];
}

const IconButton: FC<IIconButton> = ({
                                       onClick,
                                       iconType,
                                       title,
                                       bordered = false,
                                       iconModifiers,
                                     }) => {

  const onClickButtonHandler = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClick();
  };

  const modifiers = iconModifiers?.length ?
    iconModifiers.map(modifier => `icon-button__icon_${modifier}`).join(' ') :
    '';

  return (
    <button
      onClick={onClickButtonHandler}
      className={`icon-button ${bordered ? 'icon-button_bordered' : ''}`}
      title={title}
    >
      <img
        className={`icon-button__icon ${iconType}-icon ${modifiers}`}
        src={iconMap[`${iconType}`]}
        alt={`${iconType}`}
        draggable={false}
      />
    </button>
  );
};

export default IconButton;
