import React, { FC, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import MyTextArea from '../shared/inputs/myTextArea/MyTextArea.tsx';
import MyInput from '../shared/inputs/myInput/MyInput.tsx';
import MyButton from '../shared/buttons/myButton/MyButton.tsx';
import { appActionDispatcher } from '#renderer/bridge';
import NatsClientStore, { SubjectItem } from '#renderer/store/NatsClientStore.ts';
import './publishTab.scss';

export const PublishTab: FC = observer(() => {
  const { subjects, selectedId, isConnected, subscribers, selectedSubject } = NatsClientStore;
  const [subject, setSubject] = useState<string>('');
  const [payload, setPayload] = useState<string>('');

  const subscribed = useMemo(() => {
    return subscribers.includes(selectedId);
  }, [selectedId, subscribers.length]);

  const updateSubject = <
    Subj extends SubjectItem,
    Attr extends keyof Subj,
    AttrType extends Subj[Attr]
  >
  (attr: Attr, newValue: AttrType) => {
    NatsClientStore.updateSubject(selectedId, { [attr]: newValue });
  };

  const request = () => {
    updateSubject('method', 'request');
    const { id, name: subject, payload } = selectedSubject;
    appActionDispatcher('natsRequest', { id, subject, payload });
  };

  const publish = () => {
    updateSubject('method', 'publish');
    const { id, name: subject, payload } = selectedSubject;
    appActionDispatcher('natsPublish', { id, subject, payload });
  };

  const subscribe = () => {
    updateSubject('method', 'subscribe');
    NatsClientStore.addSubscriber(selectedId);
    const { id, name: subject } = selectedSubject;
    appActionDispatcher('natsSubscribe', { id, subject });
  };

  const unsubscribe = () => {
    NatsClientStore.removeSubscriber(selectedId);
    const { id, name: subject } = selectedSubject;
    appActionDispatcher('natsUnsubscribe', { id, subject });
  };

  useEffect(() => {
    updateSubject('name', subject);
    updateSubject('payload', payload);
  }, [subject, payload]);

  useEffect(() => {
    if (selectedSubject) {
      setSubject(selectedSubject.name);
      setPayload(selectedSubject.payload);
    }
  }, [selectedSubject?.id]);

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
              text={subject ?? ''}
              title={'Subject'}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="payload">
            <MyTextArea
              title={'Payload'}
              text={payload ?? ''}
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

