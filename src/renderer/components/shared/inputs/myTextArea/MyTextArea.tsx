import React, { ChangeEvent, FC, KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import './myTextArea.scss';


interface IMyTextArea {
  text: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
  title?: string;
  autoScrolling?: boolean;
}

const MyTextArea: FC<IMyTextArea> = ({ text, onChange, title, autoScrolling = false, onKeyDown }) => {
  const ref = useRef(null);
  const [onBottom, setOnBottom] = useState<boolean>(true);

  useEffect(() => {
    if (autoScrolling && onBottom) {
      const el = ref.current;
      el.scrollTop = el.scrollHeight;
    }
  }, [text, autoScrolling]);

  const onScroll = (event: React.UIEvent<HTMLTextAreaElement>) => {
    if (!autoScrolling) return;

    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if ((scrollHeight - clientHeight) - scrollTop === 0) {
      setOnBottom(true);
    } else {
      setOnBottom(false);
    }
  };

  return (
    <div className="my-textarea">
      <label className="title">{title}</label>
      <textarea
        ref={ref}
        onScroll={onScroll}
        className="input"
        value={text}
        readOnly={!onChange}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default MyTextArea;
