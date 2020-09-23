import { ClockCircleFilled, ClockCircleTwoTone } from '@ant-design/icons';
import { Button, Switch } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { SettingsModalProps } from './SettingsModal.model';

export const SettingsModal: FC<SettingsModalProps> = ({ isShowSettingsModal, setShowModalSetting }) => {
  const [darkMode, setDarkMode] = useState<any>(JSON.parse(localStorage.getItem('DARK_MODE') || '{}'));

  console.log(darkMode);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleModeChange = () => {
    setDarkMode((prev: any) => !prev);

    localStorage.setItem('DARK_MODE', JSON.stringify(!darkMode));
  };

  const handleCancelModal = useCallback(() => {
    setShowModalSetting(false);
  }, [setShowModalSetting]);

  return (
    <Modal visible={isShowSettingsModal} onCancel={handleCancelModal} title="Settings" footer={null}>
      <div>
        <Switch
          onClick={handleModeChange}
          defaultChecked={darkMode}
          checkedChildren={<ClockCircleTwoTone color="#ffff00" />}
          style={{ fontSize: '20px' }}
          unCheckedChildren={<ClockCircleFilled />}
        />
        <span>Select theme:</span>
      </div>
      <Button>Exit</Button>
    </Modal>
  );
};
