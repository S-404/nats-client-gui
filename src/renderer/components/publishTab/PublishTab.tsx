import React, { FC, KeyboardEventHandler, useMemo } from 'react';
import { observer } from 'mobx-react';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import MyTextArea from '../shared/inputs/myTextArea/MyTextArea.tsx';
import MyInput from '../shared/inputs/myInput/MyInput.tsx';
import MyButton from '../shared/buttons/myButton/MyButton.tsx';
import SavedSubjectsModal from '#renderer/components/publishTab/savedSubjectsModal/SavedSubjectsModal.tsx';
import IconButton from '#renderer/components/shared/buttons/iconButton/IconButton.tsx';
import { appActionDispatcher } from '#renderer/bridge';
import NatsClientStore from '#renderer/store/NatsClientStore.ts';
import SubjectsStore, { SubjectItem } from '#renderer/store/SubjectsStore.ts';
import { useModal } from '#renderer/hooks/useModal.ts';
import SubjectGroupsModal from '#renderer/components/subjectGroups/SubjectGroupsModal.tsx';
import SubjectGroupBadge from '#renderer/components/subjectGroups/SubjectGroupBadge.tsx';
import SubjectGroupsStore from '#renderer/store/SubjectGroupsStore.ts';

import './publishTab.scss';


export const PublishTab: FC = observer(() => {
  const { isConnected, subscribers } = NatsClientStore;
  const { subjects, selectedSubject } = SubjectsStore;
  const { groups } = SubjectGroupsStore;
  const subject = selectedSubject?.name;
  const payload = selectedSubject?.payload;
  const subjectGroup = useMemo(() => {
    if (selectedSubject && groups) {
      return groups.find(group => group.id === selectedSubject.groupId);
    }
  }, [selectedSubject?.groupId, groups]);

  const {
    isOpened: isOpenedSubjectSearch,
    open: openSubjectSearch,
    close: closeSubjectSearch,
  } = useModal();

  const {
    isOpened: isOpenedSubjectGroup,
    open: openSubjectGroup,
    close: closeSubjectGroup,
  } = useModal();

  const subscribed = useMemo(() => {
    return subscribers.includes(selectedSubject?.id);
  }, [selectedSubject?.id, subscribers.length]);

  const updateSubject = <
    Subj extends SubjectItem,
    Attr extends keyof Subj,
    AttrType extends Subj[Attr]
  >
  (attr: Attr, newValue: AttrType) => {
    SubjectsStore.updateSubject(selectedSubject?.id, { [attr]: newValue });
  };

  const setSubject = (value: string) => {
    updateSubject('name', value);
  };

  const setPayload = (value: string) => {
    updateSubject('payload', value);
  };

  const request = () => {
    updateSubject('method', 'request');
    appActionDispatcher('natsRequest', { id: selectedSubject?.id, subject, payload });
  };

  const publish = () => {
    updateSubject('method', 'publish');
    appActionDispatcher('natsPublish', { id: selectedSubject?.id, subject, payload });
  };

  const subscribe = () => {
    NatsClientStore.addSubscriber(selectedSubject?.id);
    appActionDispatcher('natsSubscribe', { id: selectedSubject?.id, subject });
  };

  const unsubscribe = () => {
    NatsClientStore.removeSubscriber(selectedSubject?.id);
    appActionDispatcher('natsUnsubscribe', { id: selectedSubject?.id, subject });
  };

  const onSelectSavedSubjectHandler = async (subjectItem: SubjectItem) => {
    if (subscribed && subjectItem.name !== subject) {
      unsubscribe();
    }
    updateSubject('name', subjectItem.name);
    closeSubjectSearch();
  };

  const onSelectSubjectGroupHandler = async (groupId: string) => {
    updateSubject('groupId', groupId);
    closeSubjectGroup();
  };

  const payloadChecker = useMemo(() => {
    let result = 'ok';
    try {
      JSON.parse(payload || '{}');
    } catch (e) {
      result = e.message;
    }
    return result;
  }, [payload]);

  const onKeyDownSubjectHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      SubjectsStore.saveSubject(selectedSubject.id);
    }

    return false;
  };

  const onKeyDownPayloadHandler: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    const input = e.currentTarget;

    if (e.key === 'Tab') {
      e.preventDefault();
      const start = input.selectionStart;
      const end = input.selectionEnd;

      const newValue = input.value.substring(0, start) + '  ' + input.value.substring(end);

      input.value = newValue;
      input.selectionStart = input.selectionEnd = end + 2;

      setPayload(newValue);
    }
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      SubjectsStore.saveSubject(selectedSubject.id);
    }

    return false;
  };

  if (!selectedSubject) {
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
        <div className={'icon-buttons'}>
          <>
            <div onClick={openSubjectGroup}>
              <SubjectGroupBadge
                group={subjectGroup}
              />
            </div>
          </>
        </div>
        <div className="inputs">
          <div className="subject">
            <MyInput
              text={subject ?? ''}
              title={'Subject'}
              onChange={(e) => setSubject(e.target.value)}
              clearButton={false}
              onKeyDown={onKeyDownSubjectHandler}
            />
            <IconButton
              onClick={openSubjectSearch}
              iconType={'search'}
            />
          </div>

          <div className="payload">
            <MyTextArea
              title={'Payload'}
              text={payload ?? ''}
              onChange={(e) => setPayload(e.target.value)}
              onKeyDown={onKeyDownPayloadHandler}
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
      <SavedSubjectsModal
        isModalOpened={isOpenedSubjectSearch}
        closeModal={closeSubjectSearch}
        onSelect={onSelectSavedSubjectHandler}
      />
      <SubjectGroupsModal
        isModalOpened={isOpenedSubjectGroup}
        closeModal={closeSubjectGroup}
        onSelect={onSelectSubjectGroupHandler}
      />
    </TabContainer>
  );
});

