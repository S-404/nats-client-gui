import React, { FC, useEffect, useState } from 'react';
import './loggerTab.scss';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import { LOGGER_ADD } from '../../../app/events/constants.ts';

export const LoggerTab: FC = () => {
  const [log, setLog] = useState([]);

  useEffect(() => {
    window.ipcRenderer.on(LOGGER_ADD, (_event, message) => {
      setLog(prev => prev ? `${prev}\n${message}` : message);
    });
  }, []);


  return (
    <TabContainer name={'logger'}>
      <>
        <textarea value={log}/>
      </>
    </TabContainer>
  );
};
