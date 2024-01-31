import React, { FC, useEffect, useState } from 'react';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import actionDispatcher from '../../actions/dispatcher.ts';
import MyInput from '../shared/inputs/myInput/MyInput.tsx';
import MyButton from '../shared/buttons/myButton/MyButton.tsx';
import { observer } from 'mobx-react';
import { NATS_STATUS_CONNECTED } from '#app/events/constants.ts';
import NatsClientStore from '#renderer/store/NatsClientStore.ts';
import './serversTab.scss';


export const ServersTab: FC = observer(() => {
  const { isConnected } = NatsClientStore;
  const [host, setHost] = useState<string>('');
  const [port, setPort] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    window.ipcRenderer.on(NATS_STATUS_CONNECTED, (_, message) => {
      NatsClientStore.setIsConnected(!!message);
    });
  }, []);

  useEffect(() => {
    const checkStore = async () => {
      const attrMap = {
        'host': setHost,
        'port': setPort,
        'token': setToken,
      };

      for (const attr of Object.keys(attrMap)) {
        const value = await actionDispatcher('storeGet', attr);
        if (value) {
          const setState = attrMap[attr];
          setState(value);
        }
      }
    };

    checkStore();
  }, []);


  const storeSave = async () => {
    await actionDispatcher('storeSave', { host });
    await actionDispatcher('storeSave', { port });
    await actionDispatcher('storeSave', { token });
    setIsSaved(true);
  };

  useEffect(() => {
    setIsSaved(false);
  }, [host, port, token]);

  const connect = async () => {
    await actionDispatcher('natsConnect', { host, port, token });
  };

  const disconnect = async () => {
    await actionDispatcher('natsDisconnect', {});
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
                  disabled={!host || !port}
                />
                <MyButton
                  text={isSaved ? 'Saved' : 'Save'}
                  onClick={storeSave}
                  color={isSaved ? 'white' : 'green'}
                  disabled={!host || !port}
                />
              </>
            }
          </>
        </div>
      </div>
    </TabContainer>
  );
});
