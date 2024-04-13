import React, { FC, ReactNode } from 'react';
import IconButton from '#renderer/components/shared/buttons/iconButton/IconButton.tsx';

import './modal.scss'


interface IModal {
  isModalOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  title: string;
}

const Modal: FC<IModal> = ({ isModalOpen, title, children, onClose }) => {

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className={'modal'}
         onClick={onClose}
    >
      <div
        className={'modal__modal-content'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={'modal-content__header'}>
          <h3 className="modal-title">{title}</h3>
          <div className={'modal-close-button'}>
            <IconButton
              onClick={onClose}
              iconType={'clear'}
            />
          </div>

        </div>
        <hr/>
        <div className={'modal-content__body'}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
