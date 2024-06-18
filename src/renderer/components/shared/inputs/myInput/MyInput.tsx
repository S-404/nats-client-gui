import React, { ChangeEvent, FC, KeyboardEventHandler, useRef } from 'react';
import IconButton from '#renderer/components/shared/buttons/iconButton/IconButton.tsx';
import './myInput.scss';

interface IMyInput {
  text: string;
  title?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  isSecret?: boolean;
  clearButton?: boolean;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  maxLength?: number;
}

const MyInput: FC<IMyInput> = ({
                                 text,
                                 onChange,
                                 title,
                                 disabled,
                                 isSecret,
                                 clearButton = true,
                                 onKeyDown,
                                 maxLength
                               }) => {
  const ref = useRef(null);

  const onClearButtonHandler = () => {
    // trigger onchange
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value').set;
    nativeInputValueSetter.call(ref.current, '');
    const event = new Event('input', { bubbles: true });
    ref.current.dispatchEvent(event);
  };

  return (
    <div className="my-input">
      <label className="title">{title}</label>
      <input
        ref={ref}
        className="input"
        value={text}
        readOnly={!onChange}
        onChange={onChange}
        disabled={disabled}
        type={isSecret ? 'password' : text}
        onKeyDown={onKeyDown}
        maxLength={maxLength}
      />
      {clearButton && !disabled && (
        <div className={`clear-button${clearButton ? '' : '_hidden'}`}>
          <IconButton onClick={onClearButtonHandler} iconType={'clear'}/>
        </div>
      )}
    </div>
  );
};

export default MyInput;
