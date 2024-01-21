import React, { FC } from 'react';
import './myButton.scss';

interface IMyButton {
  text: string;
  onClick: () => void;
  color?: 'white' | 'blue' | 'green' | 'orange' | 'red';
  disabled?: boolean;
}

const MyButton: FC<IMyButton> = ({ text, onClick, color, disabled }) => {
  return (
    <button
      className={`my-button my-button_${color}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default MyButton;
