import React, { FC, useEffect, useState } from 'react';
import TabContainer from '../shared/tabContainer/TabContainer.tsx';
import { appActionDispatcher } from 'src/renderer/bridge';
import MyInput from '../shared/inputs/myInput/MyInput.tsx';
import MyButton from '../shared/buttons/myButton/MyButton.tsx';
import { observer } from 'mobx-react';
import NatsClientStore from '#renderer/store/NatsClientStore.ts';
import ServerConnectionsStore, { ServerConnectionType } from '#renderer/store/ServerConnectionsStore.ts';
import { useModal } from '#renderer/hooks/useModal.ts';
import SavedServersModal from '#renderer/components/serversTab/savedServers/SavedServersModal.tsx';

import './serversTab.scss';


export const ServersTab: FC = observer(() => {
  const { isConnected } = NatsClientStore;
  const { currentConnection } = ServerConnectionsStore;
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { isOpened, open, close } = useModal();


  const updateConnection = <
    K extends keyof typeof currentConnection,
    V extends typeof currentConnection[K]
  >(key: K, value: V) => {
    ServerConnectionsStore.setCurrentConnection({
      ...currentConnection,
      [key]: value,
    });
  };

  useEffect(() => {
    const checkStore = async () => {
      const latestConnection = await appActionDispatcher('storeGet', 'latestConnection');
      if (latestConnection) {
        ServerConnectionsStore.setCurrentConnection(latestConnection);
      }
    };

    checkStore();
  }, []);

  const saveToStore = async (connection: ServerConnectionType) => {
    if (isSaved) return;

    const newConnection = {
      ...connection,
      id: `${connection.host}:${connection.port}`,
    };
    const stored: ServerConnectionType & {
      id: [string]
    }[] = (await appActionDispatcher('storeGet', 'connections')) ?? [];

    const connectionsSet = new Set(stored);
    connectionsSet.add({ ...newConnection, id: [newConnection.id] });

    appActionDispatcher('storeSave', {
      connections: Array.from(connectionsSet)
    });
    ServerConnectionsStore.addConnection(newConnection);
    setIsSaved(true);
  };

  useEffect(() => {
    setIsSaved(false);
  }, [currentConnection, isOpened]);

  const connect = async () => {
    const { host, port, token } = currentConnection;
    await appActionDispatcher('natsConnect', { host, port, token });
    await appActionDispatcher('storeSave', { latestConnection: { ...currentConnection } });
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
            text={currentConnection.host}
            disabled={isConnected}
            onChange={(e) => updateConnection('host', e.target.value)}
          />
          <MyInput
            title={'Port'}
            text={currentConnection.port}
            disabled={isConnected}
            onChange={(e) => updateConnection('port', e.target.value)}
          />
          <MyInput
            title={'Token'}
            text={currentConnection.token}
            disabled={isConnected}
            isSecret={isConnected && true}
            onChange={(e) => updateConnection('token', e.target.value)}
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
                  disabled={!currentConnection.host}
                />
                <MyButton
                  text={isSaved ? 'Saved' : 'Save'}
                  onClick={() => saveToStore(currentConnection)}
                  color={isSaved ? 'white' : 'green'}
                  disabled={!currentConnection.host}
                />
                <MyButton
                  text={'Load'}
                  color={'white'}
                  onClick={open}
                />
              </>
            }
          </>
        </div>
      </div>
      <SavedServersModal
        isModalOpened={isOpened}
        closeModal={close}/>
    </TabContainer>
  );
});
