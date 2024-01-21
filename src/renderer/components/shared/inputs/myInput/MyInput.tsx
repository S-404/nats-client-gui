import React, { ChangeEvent, FC } from 'react';
import './myInput.scss';

interface IMyInput {
  text: string;
  title?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const MyInput: FC<IMyInput> = ({ text, onChange, title }) => {
  return (
    <div className="my-input">
      <label className="title">{title}</label>
      <input
        className="input"
        value={text}
        readOnly={!onChange}
        onChange={onChange}
      />
    </div>
  );
};

export default MyInput;
