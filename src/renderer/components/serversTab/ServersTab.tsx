import React, { FC, useEffect, useState } from 'react';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import { appActionDispatcher } from 'src/renderer/bridge';
import MyInput from '../shared/inputs/myInput/MyInput.tsx';
import MyButton from '../shared/buttons/myButton/MyButton.tsx';
import { observer } from 'mobx-react';
import NatsClientStore from '#renderer/store/NatsClientStore.ts';
import './serversTab.scss';


export const ServersTab: FC = observer(() => {
  const { isConnected } = NatsClientStore;
  const [host, setHost] = useState<string>('');
  const [port, setPort] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    const checkStore = async () => {
      const attrMap = {
        'host': setHost,
        'port': setPort,
        'token': setToken,
      };

      for (const attr of Object.keys(attrMap)) {
        const value = await appActionDispatcher('storeGet', attr);
        if (value) {
          const setState = attrMap[attr];
          setState(value);
        }
      }
    };

    checkStore();
  }, []);


  const storeSave = async () => {
    await appActionDispatcher('storeSave', { host });
    await appActionDispatcher('storeSave', { port });
    await appActionDispatcher('storeSave', { token });
    setIsSaved(true);
  };

  useEffect(() => {
    setIsSaved(false);
  }, [host, port, token]);

  const connect = async () => {
    await appActionDispatcher('natsConnect', { host, port, token });
  };

  const disconnect = async () => {
    await appActionDispatcher('natsDisconnect', {});
  };

  return (
    <TabContainer name={'Server connection'}>
      <div className="servers-tab-container">
        <div className="inputs">
          <MyInput
            title={'Host'}
            text={host}
            disabled={isConnected}
            onChange={(e) => setHost(e.target.value)}
          />
          <MyInput
            title={'Port'}
            text={port}
            disabled={isConnected}
            onChange={(e) => setPort(e.target.value)}
          />
          <MyInput
            title={'Token'}
            text={token}
            disabled={isConnected}
            isSecret={isConnected && true}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>

        <div className="buttons">
          <>
            {isConnected ?
              <MyButton
                text={'Disconnect'}
                onClick={disconnect}
                color={'orange'}
              />
              :
              <>
                <MyButton
                  text={'Connect'}
                  onClick={connect}
                  color={'green'}
                  disabled={!host}
                />
                <MyButton
                  text={isSaved ? 'Saved' : 'Save'}
                  onClick={storeSave}
                  color={isSaved ? 'white' : 'green'}
                  disabled={!host}
                />
              </>
            }
          </>
        </div>
      </div>
    </TabContainer>
  );
});
