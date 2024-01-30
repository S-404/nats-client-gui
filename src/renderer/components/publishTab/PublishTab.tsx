import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import MyTextArea from '../shared/inputs/myTextArea/MyTextArea.tsx';
import MyInput from '../shared/inputs/myInput/MyInput.tsx';
import MyButton from '../shared/buttons/myButton/MyButton.tsx';
import dispatcher from '../../actions/dispatcher.ts';
import NatsClientStore from '#renderer/store/NatsClientStore.ts';
import './publishTab.scss';


export const PublishTab: FC = observer(() => {
  const { subjects, selectedId, isConnected } = NatsClientStore;
  const [subject, setSubject] = useState<string>('');
  const [payload, setPayload] = useState<string>('');

  const request = () => {
    const newSubject = NatsClientStore.addSubjectIfNotExists({
      name: subject,
      payload,
      method: 'request'
    });
    NatsClientStore.setSelectedId(newSubject.id);
    dispatcher('natsRequest', { id: newSubject?.id, subject, payload });
  };

  const publish = () => {

  };

  useEffect(() => {
    if (selectedId) {
      const target = subjects.find(item => item.id === selectedId);
      if (target) {
        setSubject(target.name);
        setPayload(target.payload);
      }
    }
  }, [subjects, selectedId]);

  return (
    <TabContainer name={'Publish message'}>
      <div className="publish-tab-container">
        <div className="inputs">
          <div className="subject">
            <MyInput
              text={subject}
              title={'Subject'}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="payload">
            <MyTextArea
              title={'Payload'}
              text={payload}
              onChange={(e) => setPayload(e.target.value)}
            />
          </div>
        </div>

        <div className="buttons">
          <MyButton
            text="Request"
            onClick={request}
            color="green"
            disabled={!isConnected || !subject?.length}
          />
          <MyButton
            text="Publish"
            onClick={publish}
            color="orange"
            disabled={!isConnected}
          />
        </div>
      </div>
    </TabContainer>
  );
});

