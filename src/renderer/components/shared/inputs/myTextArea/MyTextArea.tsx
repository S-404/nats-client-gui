import React, { ChangeEvent, FC, useEffect, useRef } from 'react';
import './myTextArea.scss';


interface IMyTextArea {
  text: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  title?: string;
  autoScrolling?: boolean;
}

const MyTextArea: FC<IMyTextArea> = ({ text, onChange, title, autoScrolling = false }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (autoScrolling) {
      const el = ref.current;
      el.scrollTop = el.scrollHeight;
    }
  }, [text, autoScrolling]);

  return (
    <div className="my-textarea">
      <label className="title">{title}</label>
      <textarea
        ref={ref}
        className="input"
        value={text}
        readOnly={!onChange}
        onChange={onChange}
      />
    </div>
  );
};

export default MyTextArea;
