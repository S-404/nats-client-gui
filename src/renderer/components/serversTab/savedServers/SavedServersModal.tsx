import React, { FC, useEffect } from 'react';
import Modal from '#renderer/components/shared/modal/Modal.tsx';
import { appActionDispatcher } from '#renderer/bridge';
import ServerConnectionsStore, { ServerConnectionType } from '#renderer/store/ServerConnectionsStore.ts';
import IconButton from '#renderer/components/shared/buttons/iconButton/IconButton.tsx';
import { observer } from 'mobx-react';
import './savedServersModal.scss';

interface ISavedServersModalProps {
  isModalOpened: boolean;
  closeModal: () => void;
}


const SavedServersModal: FC<ISavedServersModalProps> = observer(({ isModalOpened, closeModal }) => {
  const { connections } = ServerConnectionsStore;

  const removeFromStore = async (id: string) => {
    ServerConnectionsStore.removeConnection(id);
    const stored: ServerConnectionType [] = (await appActionDispatcher('storeGet', 'connections')) ?? [];
    appActionDispatcher('storeSave', {
      connections: stored.filter((item) => item.id !== id)
    });
  };

  const loadFromStore = (connection: ServerConnectionType) => {
    ServerConnectionsStore.setCurrentConnection(connection);
    closeModal();
  };


  useEffect(() => {
    const loadSavedConnections = async () => {
      const storedConnections = await appActionDispatcher('storeGet', 'connections');
      ServerConnectionsStore.setConnections([...storedConnections] ?? []);
    };

    loadSavedConnections();
  }, []);


  return (
    <Modal
      isModalOpen={isModalOpened}
      onClose={closeModal}
      title={'Load server connection'}
    >
      <div className={'saved-connections'}>
        {connections.map((item) => (
          <div
            key={item.id}
            className={'saved-connections__connection'}
          >
            <div
              className="connection__item"
              onClick={() => loadFromStore(item)}
            >
              <p><i>host:</i> {item.host}</p>
              <p><i>port:</i> {item.port}</p>
            </div>
            <div className={'connection__remove-button'}>
              <IconButton
                onClick={() => removeFromStore(item.id)}
                iconType={'remove'}
              />
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
});


export default SavedServersModal;
