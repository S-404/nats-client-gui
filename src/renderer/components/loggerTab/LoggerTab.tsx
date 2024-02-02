import React, { FC } from 'react';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import MyTextArea from '../shared/inputs/myTextArea/MyTextArea.tsx';
import LogMessagesStore from '#renderer/store/LogMessagesStore.ts';
import { observer } from 'mobx-react';
import './loggerTab.scss';

export const LoggerTab: FC = observer(() => {
  const { logMessages } = LogMessagesStore;

  return (
    <TabContainer name={'Logger'}>
      <div className="logger-tab-container">
        <MyTextArea
          text={logMessages.join('\n')}
          autoScrolling={true}
        />
      </div>

    </TabContainer>
  );
});
