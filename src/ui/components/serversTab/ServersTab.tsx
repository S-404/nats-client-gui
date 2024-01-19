import React, { FC } from 'react';
import './serversTab.scss';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';

export const ServersTab: FC = () => {

  const connect = async () => {
    console.log('connect');
  };
  return (
    <TabContainer name={'servers'}>
      <>
        <button onClick={connect}>connect</button>
      </>
    </TabContainer>
  );
};
