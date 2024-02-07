import React, { FC, ReactNode } from 'react';
import RemoveButton from '#renderer/components/shared/buttons/removeButton/RemoveButton.tsx';

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
          <RemoveButton onClick={onClose}/>
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
