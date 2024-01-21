import React, { FC, useState } from 'react';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import MyTextArea from '../shared/inputs/myTextArea/MyTextArea.tsx';
import MyInput from '../shared/inputs/myInput/MyInput.tsx';
import MyButton from '../shared/buttons/myButton/MyButton.tsx';
import dispatcher from '../../actions/dispatcher.ts';
import './publishTab.scss';

export const PublishTab: FC = () => {

  const [subject, setSubject] = useState<string>('');
  const [payload, setPayload] = useState<string>('');

  const request = async () => {
    const response = await dispatcher('natsRequest', { subject, payload });
    console.log(response);
  };

  const publish = () => {

  };

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
};

