import React, { FC, MouseEvent } from 'react';
import './myButton.scss';

interface IMyButton {
  text: string;
  onClick: () => void;
  color?: 'white' | 'blue' | 'green' | 'orange' | 'red';
  disabled?: boolean;
}

const MyButton: FC<IMyButton> = ({ text, onClick, color, disabled }) => {

  const onClickButtonHandler = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button
      className={`my-button my-button_${color}`}
      onClick={onClickButtonHandler}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default MyButton;
