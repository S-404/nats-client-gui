import React, { FC, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import NatsClientStore from '#renderer/store/NatsClientStore.ts';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import MySyntaxHighlighter from '#renderer/components/shared/syntaxHighlighter/MySyntaxHighlighter.tsx';
import IconButton from '#renderer/components/shared/buttons/iconButton/IconButton.tsx';

import './messageTab.scss';


export const MessagesTab: FC = observer(() => {
  const { subjects, selectedSubject, messages: allMessages } = NatsClientStore;
  const [isShownAll, setIsShownAll] = useState<boolean>(false);

  const messages = useMemo(() => {
    if (isShownAll && selectedSubject) {
      return allMessages
        .reduce((acc, curr) => {
          if (curr.subjectId === selectedSubject?.id) {
            acc.push(curr.message);
          }
          return acc;
        }, [])
        .join('\n');
    }

    const subjectMessages = allMessages.filter(item => item.subjectId === selectedSubject?.id);
    return subjectMessages.length >= 1 ? subjectMessages[subjectMessages.length - 1].message : '';

  }, [allMessages.length, selectedSubject?.id, isShownAll]);

  const clear = () => {
    NatsClientStore.clearSubjectMessages(selectedSubject?.id);
  };


  if (!selectedSubject) {
    return (
      <TabContainer name={'Messages'}>
        <div className="publish-tab-container_empty">
          <p>{subjects.length ? 'Select subject' : 'Add subject'}</p>
        </div>
      </TabContainer>
    );
  }


  return (
    <TabContainer name={'Messages'}>
      <div className="messages-tab-container">
        <div className="text-area">
          <div className="text-area__input">
            <MySyntaxHighlighter
              text={messages}
            />
          </div>
          <label className="text-area__label">
            {isShownAll ? 'All' : 'Latest'}
          </label>
        </div>
        <div className="buttons">
          <IconButton
            onClick={() => setIsShownAll(prevState => !prevState)}
            iconType={isShownAll ? 'message' : 'messages'}
            title={isShownAll ? 'Show latest message' : 'Show all messages'}
            bordered
          />
          <IconButton
            onClick={() => navigator.clipboard.writeText(messages)}
            iconType={'copy'}
            title={isShownAll ? 'Copy messages' : 'Copy message'}
            bordered
          />
          <IconButton
            onClick={clear}
            iconType={'broom'}
            title={'Clear messages'}
            bordered
          />
        </div>
      </div>
    </TabContainer>
  );
});


