import React, { FC, useState } from 'react';
import './publishTab.scss';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import MyTextArea from '../shared/inputs/myTextArea/MyTextArea.tsx';
import MyInput from '../shared/inputs/myInput/MyInput.tsx';
import MyButton from '../shared/buttons/myButton/MyButton.tsx';
import dispatcher from '../../actions/dispatcher.ts';

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

        <div style={{ marginBottom: '1em' }}>
          <MyInput
            text={subject}
            title={'Subject'}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div style={{ height: '150px', marginBottom: '1em' }}>
          <MyTextArea
            title={'Payload'}
            text={payload}
            onChange={(e) => setPayload(e.target.value)}
          />
        </div>

        <div
          style={{
            display: 'flex',
          }}
          className="buttons"
        >
          <MyButton
            text="Request"
            onClick={request}
            color="green"
            disabled={!subject.length || !payload.length}
          />
          <div style={{ width: '1em' }}></div>
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

