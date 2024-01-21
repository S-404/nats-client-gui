import React, { ChangeEvent, FC } from 'react';
import './myInput.scss';

interface IMyInput {
  text: string;
  title?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  isSecret?: boolean;
}

const MyInput: FC<IMyInput> = ({ text, onChange, title, disabled, isSecret }) => {
  return (
    <div className="my-input">
      <label className="title">{title}</label>
      <input
        className="input"
        value={text}
        readOnly={!onChange}
        onChange={onChange}
        disabled={disabled}
        type={isSecret ? 'password' : text}
      />
    </div>
  );
};

export default MyInput;
