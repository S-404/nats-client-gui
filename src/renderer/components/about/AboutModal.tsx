import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Modals from '#renderer/store/Modals.ts';
import Modal from '#renderer/components/shared/modal/Modal.tsx';
import IconButton from '#renderer/components/shared/buttons/iconButton/IconButton.tsx';

import './aboutModal.css'

export const AboutModal: FC = observer(() => {
  const { aboutModal: isOpened } = Modals;
  const URL = 'https://github.com/S-404/nats-client-gui';
  const URL_RELEASES = URL + '/releases';

  const closeModal = () => {
    Modals.setAboutModal(false);
  };

  return (
    <Modal isModalOpen={isOpened} onClose={closeModal} title={'About'}>
      <div className={'about-container'}>
        <h1>nats-js-client</h1>
        <article>
          <br/>
          <p>gui for nats.js client</p>
          <br/>
          <p>
            repository:
            <a>{URL}</a>
            <div className={'copy-button'}>
              <IconButton
                onClick={() => navigator.clipboard.writeText(URL)}
                iconType={'copy'}
              />
            </div>
          </p>
          <p>
            releases:
            <a>{URL_RELEASES}</a>
            <div className={'copy-button'}>
              <IconButton
                onClick={() => navigator.clipboard.writeText(URL_RELEASES)}
                iconType={'copy'}
              />
            </div>
          </p>
        </article>
      </div>
    </Modal>
  );
});
