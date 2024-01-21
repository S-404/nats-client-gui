import React, { FC, useEffect, useState } from 'react';
import './messageTab.scss';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import MyTextArea from '../shared/inputs/myTextArea/MyTextArea.tsx';
import { NATS_MESSAGE_ADD } from '../../../app/events/constants.ts';
import MyButton from '../shared/buttons/myButton/MyButton.tsx';
import dayjs from 'dayjs';

export const MessagesTab: FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    window.ipcRenderer.on(NATS_MESSAGE_ADD, (_event, message) => {
      if (message.type === 'response') {
        const payload = JSON.parse(message.packet.payload);
        const date = dayjs.unix(message.packet.timestamp).format('YYYY-MM-DD HH:mm:ss');
        const messageStr = `--- ${date} ---\n${JSON.stringify(payload, undefined, 2)}`;

        setMessages(prev => [...prev, messageStr]);
      }
    });
  }, []);

  return (
    <TabContainer name={'messages'}>
      <div style={{ height: '350px' }}>
        <div style={{ height: '300px', marginBottom: '1em' }}>
          <MyTextArea
            text={messages.join('\n')}
            autoScrolling={true}
          />
        </div>
        <div>
          <MyButton
            text="Clear"
            color="white"
            onClick={() => setMessages([])}
          />
        </div>
      </div>

    </TabContainer>
  );
};


