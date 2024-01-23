import React, { FC } from 'react';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import Subjects, { SubjectItem } from '../../store/subjects.ts';
import { observer } from 'mobx-react';
import Subject from './subject/Subject.tsx';
import './subjectsTab.scss';

export const SubjectsTab: FC = observer(() => {
  const { subjects, selected } = Subjects;

  const selectSubject = (subject: SubjectItem) => {
    console.log('selectSubject', subject);
    Subjects.selectSubject(subject);
  };

  const remove = (id: string) => {
    Subjects.remove(id);
  };

  return (
    <TabContainer name={'Subjects'}>
      <div className={'subjects-tab-container'}>
        {subjects.map((item) => (
          <Subject
            onClick={selectSubject}
            key={item.id}
            isSelected={selected?.id === item.id}
            removeSubject={remove}
            {...item}
          />
        ))}
      </div>

    </TabContainer>
  );
});

