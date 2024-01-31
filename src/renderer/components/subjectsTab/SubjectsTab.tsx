import React, { FC } from 'react';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import NatsClientStore, { SubjectItem } from '#renderer/store/NatsClientStore.ts';
import { observer } from 'mobx-react';
import Subject from './subject/Subject.tsx';
import './subjectsTab.scss';
import dispatcher from '#renderer/actions/dispatcher.ts';


export const SubjectsTab: FC = observer(() => {
  const { subjects, selectedId } = NatsClientStore;

  const selectSubject = (subject: SubjectItem) => {
    NatsClientStore.setSelectedId(subject.id);
  };

  const remove = ({ id, subject }: { id: string, subject: string }) => {
    NatsClientStore.removeSubject(id);
    dispatcher('natsUnsubscribe', { subject });
  };

  return (
    <TabContainer name={'Subjects'}>
      <div className={'subjects-tab-container'}>
        {subjects.map((item) => (
          <Subject
            onClick={selectSubject}
            key={item.id}
            isSelected={selectedId === item.id}
            removeSubject={remove}
            {...item}
          />
        ))}
      </div>

    </TabContainer>
  );
});

