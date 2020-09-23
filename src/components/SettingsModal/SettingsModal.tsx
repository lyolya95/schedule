import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { FC, useCallback } from 'react';
import { SettingsModalProps } from './SettingsModal.model';

export const SettingsModal: FC<SettingsModalProps> = ({ isShowSettingsModal, setShowModalSetting }) => {
  const handleCancelModal = useCallback(() => {
    setShowModalSetting(false);
  }, [setShowModalSetting]);

  return (
    <Modal visible={isShowSettingsModal} onCancel={handleCancelModal}>
      <div>Tyt modal</div>
      <Button>Exit</Button>
    </Modal>
  );
};
