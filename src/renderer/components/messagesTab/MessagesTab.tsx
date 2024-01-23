import React, { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import MyTextArea from '../shared/inputs/myTextArea/MyTextArea.tsx';
import { NATS_MESSAGE_ADD } from '../../../app/events/constants.ts';
import MyButton from '../shared/buttons/myButton/MyButton.tsx';
import Subjects from '../../store/subjects.ts';
import './messageTab.scss';

export const MessagesTab: FC = () => {
  const selectedSubject = Subjects.selected;
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

  useEffect(() => {
    if (selectedSubject) {
      setMessages(selectedSubject.messages ?? []);
    }
  }, [selectedSubject]);

  return (
    <TabContainer name={'Messages'}>
      <div className="messages-tab-container">
        <div className="inputs">
          <MyTextArea
            text={messages.join('\n')}
            autoScrolling={true}
          />
        </div>
        <div className="buttons">
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


