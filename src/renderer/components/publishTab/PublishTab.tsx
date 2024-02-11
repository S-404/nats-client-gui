import React, { FC, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import MyTextArea from '../shared/inputs/myTextArea/MyTextArea.tsx';
import MyInput from '../shared/inputs/myInput/MyInput.tsx';
import MyButton from '../shared/buttons/myButton/MyButton.tsx';
import { appActionDispatcher } from '#renderer/bridge';
import NatsClientStore from '#renderer/store/NatsClientStore.ts';
import './publishTab.scss';

export const PublishTab: FC = observer(() => {
  const { subjects, selectedId, isConnected, subscribers } = NatsClientStore;
  const [subject, setSubject] = useState<string>('');
  const [payload, setPayload] = useState<string>('');

  const subscribed = useMemo(() => {
    return subscribers.includes(selectedId);
  }, [selectedId, subscribers.length]);

  const request = () => {
    NatsClientStore.updateSubject(selectedId, {
      method: 'request',
      payload,
      name: subject
    });
    appActionDispatcher('natsRequest', { id: selectedId, subject, payload });
  };

  const publish = () => {
    NatsClientStore.updateSubject(selectedId, {
      method: 'publish',
      payload,
      name: subject
    });
    appActionDispatcher('natsPublish', { id: selectedId, subject, payload });
  };

  const subscribe = () => {
    NatsClientStore.updateSubject(selectedId, {
      method: 'subscribe',
      payload,
      name: subject
    });
    NatsClientStore.addSubscriber(selectedId);
    appActionDispatcher('natsSubscribe', { id: selectedId, subject });
  };

  const unsubscribe = () => {
    NatsClientStore.removeSubscriber(selectedId);
    appActionDispatcher('natsUnsubscribe', { id: selectedId, subject });
  };


  useEffect(() => {
    if (selectedId) {
      const target = subjects.find(item => item.id === selectedId);
      if (target) {
        setSubject(target.name);
        setPayload(target.payload ?? '');
      }
    }
  }, [subjects, selectedId]);

  if (!selectedId) {
    return (
      <TabContainer name={'Publish message'}>
        <div className="publish-tab-container_empty">
          <p>{subjects.length ? 'Select subject' : 'Add subject'}</p>
        </div>
      </TabContainer>
    );
  }

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
            disabled={!isConnected || !subject?.length}
          />
          <MyButton
            text={subscribed ? 'Unsubscribe' : 'Subscribe'}
            onClick={subscribed ? unsubscribe : subscribe}
            color="red"
            disabled={!isConnected || !subject?.length}
          />
        </div>
      </div>
    </TabContainer>
  );
});

