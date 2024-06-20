import React, { FC } from 'react';
import Modal from '#renderer/components/shared/modal/Modal.tsx';
import { observer } from 'mobx-react';
import Modals from '#renderer/store/Modals.ts';
import About from '#renderer/components/about/About.tsx';

const AboutModal: FC = observer(() => {
  const { aboutModal: isOpened } = Modals;

  const closeModal = () => {
    Modals.setAboutModal(false);
  };

  return (
    <Modal isModalOpen={isOpened} onClose={closeModal} title={'About'}>
      <About/>
    </Modal>
  );
});

export default AboutModal;
