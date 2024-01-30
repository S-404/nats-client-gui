import React, { FC, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import dayjs from 'dayjs';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import MyTextArea from '../shared/inputs/myTextArea/MyTextArea.tsx';
import { NATS_MESSAGE_ADD } from '#app/events/constants.ts';
import MyButton from '../shared/buttons/myButton/MyButton.tsx';
import NatsClientStore from '#app/stores/NatsClientStore.ts';
import './messageTab.scss';


export const MessagesTab: FC = observer(() => {
  const { selectedId, messages: allMessages } = NatsClientStore;

  const messages = useMemo(() => {
    return allMessages
      .reduce((acc, curr) => {
        if (curr.subjectId === selectedId) {
          acc.push(curr.message);
        }
        return acc;
      }, [])
      .join('\n');
  }, [allMessages.length, selectedId]);

  const clear = () => {
    NatsClientStore.clearSubjectMessages(selectedId);
  };

  useEffect(() => {
    window.ipcRenderer.on(NATS_MESSAGE_ADD, (_event, message) => {
      if (message.type === 'response') {
        const payload = JSON.parse(message.packet.payload);
        const date = dayjs.unix(message.packet.timestamp).format('YYYY-MM-DD HH:mm:ss');
        const messageStr = `--- ${date} ---\n${JSON.stringify(payload, undefined, 2)}`;
        NatsClientStore.addMessage({ subjectId: message.subjectId, message: messageStr });
      }
    });
  }, []);

  return (
    <TabContainer name={'Messages'}>
      <div className="messages-tab-container">
        <div className="inputs">
          <MyTextArea
            text={messages}
            autoScrolling={true}
          />
        </div>
        <div className="buttons">
          <MyButton
            text="Clear"
            color="white"
            onClick={clear}
          />
        </div>
      </div>
    </TabContainer>
  );
});


