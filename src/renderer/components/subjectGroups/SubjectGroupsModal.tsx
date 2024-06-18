import React, { FC } from 'react';
import Modal from '#renderer/components/shared/modal/Modal.tsx';
import SubjectGroups from '#renderer/components/subjectGroups/SubjectGroups.tsx';


interface ISubjectGroupsModalProps {
  isModalOpened: boolean,
  closeModal: () => void;
  onSelect: (groupId: string) => void;
}

const SubjectGroupsModal: FC<ISubjectGroupsModalProps> = ({ isModalOpened, closeModal, onSelect }) => {
  return (
    <Modal
      isModalOpen={isModalOpened}
      onClose={closeModal}
      title={'Subject groups'}
    >
      <SubjectGroups
        onSelect={onSelect}
      />
    </Modal>
  );
};

export default SubjectGroupsModal;
