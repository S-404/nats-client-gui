import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import LogMessagesStore from '#renderer/store/LogMessagesStore.ts';
import IconButton from '#renderer/components/shared/buttons/iconButton/IconButton.tsx';

import './loggerTab.scss';

export const LoggerTab: FC = observer(() => {
  const { logMessages, subjectCounter } = LogMessagesStore;
  const ref = useRef(null);
  const [onBottom, setOnBottom] = useState<boolean>(true);
  const [isGrouped, setIsGrouped] = useState<boolean>(false);

  const groupedLogMessages: Array<{ subject: string, counter: number }> = useMemo(() => {
    if (!isGrouped) return [];

    return Object.keys(subjectCounter).map(subject => ({
      counter: subjectCounter[subject] ?? 0,
      subject,
    }));
  }, [subjectCounter, logMessages?.length, isGrouped]);

  useEffect(() => {
    if (onBottom) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [logMessages.length, onBottom]);

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if ((scrollHeight - clientHeight) - scrollTop <= 1) {
      setOnBottom(true);
    } else {
      setOnBottom(false);
    }
  };

  return (
    <TabContainer name={'Logger'}>
      <div className="logger-tab-container">
        <div className="logger-tab-container__buttons">
          <IconButton
            onClick={() => setOnBottom(prevState => !prevState)}
            iconType={'scrollDown'}
            title={'Auto scroll'}
            iconModifiers={onBottom && ['green']}
            bordered
          />
          <IconButton
            onClick={() => setIsGrouped(prevState => !prevState)}
            iconType={'grouped'}
            title={'Group by subject'}
            iconModifiers={isGrouped && ['green']}
            bordered
          />
          <IconButton
            onClick={() => LogMessagesStore.clear()}
            iconType={'broom'}
            title={'Clear'}
            bordered
          />
        </div>

        <div
          ref={ref}
          className="log-list"
          onScroll={onScroll}
        >
          {isGrouped ?
            (<>
              {groupedLogMessages.map(item => (
                <div
                  key={`${item.subject}`}
                  className="log-list__log-item"
                >
                  <a
                    onClick={() => navigator.clipboard.writeText(item.subject)}
                    className={`log-item__message log-item__message_info`}
                  >
                    {item.subject}
                  </a>
                  <a className="log-item__counter">
                    {` x${item.counter}`}
                  </a>
                  <a className="copy-button">
                    <IconButton
                      iconType="copy"
                      onClick={() => navigator.clipboard.writeText(item.subject)}
                    />
                  </a>
                </div>
              ))}
            </>)
            :
            (<>
              {logMessages.map((item, index) => (
                <div
                  key={`${item.time}_${index}`}
                  className="log-list__log-item"
                >
                  <a className="log-item__time">
                    {`${item.time}: `}
                  </a>
                  <a
                    onClick={() => navigator.clipboard.writeText(item.message)}
                    className={`log-item__message log-item__message_${item.type}`}
                  >
                    {item.message}
                  </a>
                  {item.subject && (
                    <a className="copy-button">
                      <IconButton
                        iconType="copy"
                        onClick={() => navigator.clipboard.writeText(item.subject)}
                      />
                    </a>
                  )}
                </div>
              ))}
            </>)
          }
        </div>
      </div>
    </TabContainer>
  );
});
