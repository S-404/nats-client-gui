import React, { FC, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import MyTextArea from '../shared/inputs/myTextArea/MyTextArea.tsx';
import MyInput from '../shared/inputs/myInput/MyInput.tsx';
import MyButton from '../shared/buttons/myButton/MyButton.tsx';
import IconButton from '#renderer/components/shared/buttons/iconButton/IconButton.tsx';
import { appActionDispatcher } from '#renderer/bridge';
import NatsClientStore, { SubjectItem } from '#renderer/store/NatsClientStore.ts';
import PublishedSubjectsStore from '#renderer/store/PublishedSubjectsStore.ts';
import { useModal } from '#renderer/hooks/useModal.ts';
import PublishedSubjectsModal from '#renderer/components/publishTab/publishedSubjects/PublishedSubjectsModal.tsx';

import './publishTab.scss';


export const PublishTab: FC = observer(() => {
  const { subjects, isConnected, subscribers, selectedSubject } = NatsClientStore;
  const { currentSubject: subject } = PublishedSubjectsStore;
  const [payload, setPayload] = useState<string>('');
  const { isOpened, open, close } = useModal();

  const subscribed = useMemo(() => {
    return subscribers.includes(selectedSubject?.id);
  }, [selectedSubject?.id, subscribers.length]);

  const updateSubject = <
    Subj extends SubjectItem,
    Attr extends keyof Subj,
    AttrType extends Subj[Attr]
  >
  (attr: Attr, newValue: AttrType) => {
    NatsClientStore.updateSubject(selectedSubject?.id, { [attr]: newValue });
  };

  const setSubject = (value: string) => {
    PublishedSubjectsStore.setCurrentSubject(value);
  };

  const savePublishedSubject = async () => {
    PublishedSubjectsStore.addPublishedSubject(subject);

    const stored: string[] = (await appActionDispatcher('storeGet', 'publishedSubjects')) ?? [];
    const subjectsSet = new Set(stored);
    subjectsSet.add(subject);
    appActionDispatcher('storeSave', {
      publishedSubjects: Array.from(subjectsSet)
    });
  };

  const request = () => {
    updateSubject('method', 'request');
    savePublishedSubject();
    appActionDispatcher('natsRequest', { id: selectedSubject?.id, subject, payload });
  };

  const publish = () => {
    updateSubject('method', 'publish');
    savePublishedSubject();
    appActionDispatcher('natsPublish', { id: selectedSubject?.id, subject, payload });
  };

  const subscribe = () => {
    updateSubject('method', 'subscribe');
    NatsClientStore.addSubscriber(selectedSubject?.id);
    savePublishedSubject();
    appActionDispatcher('natsSubscribe', { id: selectedSubject?.id, subject });
  };

  const unsubscribe = () => {
    NatsClientStore.removeSubscriber(selectedSubject?.id);
    appActionDispatcher('natsUnsubscribe', { id: selectedSubject?.id, subject });
  };

  const onSelectPublishedSubjectHandler = (publishedSubject: string) => {
    if(publishedSubject !== subject && subscribed){
      unsubscribe()
    }
    PublishedSubjectsStore.setCurrentSubject(publishedSubject);
    close();
  }

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

  const payloadChecker = useMemo(() => {
    let result = 'ok';
    try {
      JSON.parse(payload || '{}');
    } catch (e) {
      result = e.message;
    }
    return result;
  }, [payload]);

  if (!selectedSubject?.id) {
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
              clearButton={false}
            />
            <IconButton
              onClick={open}
              iconType={'search'}
            />
          </div>

          <div className="payload">
            <MyTextArea
              title={'Payload'}
              text={payload ?? ''}
              onChange={(e) => setPayload(e.target.value)}
            />
            <div className="payload__checker">
              <a>JSON.parse: {payloadChecker}</a>
            </div>
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
      <PublishedSubjectsModal
        isModalOpened={isOpened}
        closeModal={close}
        onSelect={onSelectPublishedSubjectHandler}
      />
    </TabContainer>
  );
});

