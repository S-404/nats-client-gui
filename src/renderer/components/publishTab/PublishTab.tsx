import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import MyTextArea from '../shared/inputs/myTextArea/MyTextArea.tsx';
import MyInput from '../shared/inputs/myInput/MyInput.tsx';
import MyButton from '../shared/buttons/myButton/MyButton.tsx';
import dispatcher from '../../actions/dispatcher.ts';
import Subjects from '../../store/subjects.ts';
import './publishTab.scss';


export const PublishTab: FC = observer(() => {
  const selected = Subjects.selected;
  const [subject, setSubject] = useState<string>('');
  const [payload, setPayload] = useState<string>('');

  const request = async () => {
    Subjects.addIfNotExists({
      name: subject,
      payload,
      method: 'request'
    });
    await dispatcher('natsRequest', { subject, payload });
  };

  const publish = () => {

  };

  useEffect(() => {
    if (selected) {
      setSubject(selected.name);
      setPayload(selected.payload);
    }
  }, [selected]);

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
            disabled={!subject.length || !payload.length}
          />
          <MyButton
            text="Publish"
            onClick={publish}
            color="orange"
          />
        </div>
      </div>
    </TabContainer>
  );
});

