import React, { FC, useEffect, useRef } from 'react';
import './textarea.scss';


interface ITextArea {
  text: string;
  autoScrolling?: boolean;
}

const TextArea: FC<ITextArea> = ({ text, autoScrolling = false }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (autoScrolling) {
      const el = ref.current;
      el.scrollTop = el.scrollHeight;
    }
  }, [text, autoScrolling]);

  return (
    <textarea
      ref={ref}
      className="textarea"
      value={text}
    />
  );
};

export default TextArea;
