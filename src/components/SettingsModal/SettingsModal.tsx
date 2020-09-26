import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Button, Switch } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import { useStickyState } from '../MentorFilters/hooks/useStickyState';
import { SettingsModalProps } from './SettingsModal.model';
import './SettingsModal.scss';

export const SettingsModal: FC<SettingsModalProps> = ({
  isShowSettingsModal,
  setShowModalSetting,
  types,
  setColorType,
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [colorDeadline, setColorDeadline] = useState<string>('#FF69B4');
  const [colorsLocalStorage, setColorsLocalStorage] = useStickyState('', 'colorDeadline');

  const newColorDeadline = types.filter((i) => i.type === 'deadline').map((i) => ({ ...i, color: colorDeadline }));
  const filteredType = types.filter((i) => i.type !== 'deadline');

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('colorDeadline')!)) {
      setColorDeadline(JSON.parse(localStorage.getItem('colorDeadline')!));
    }
    if (JSON.parse(localStorage.getItem('DARK_MODE')!)) {
      setDarkMode(JSON.parse(localStorage.getItem('DARK_MODE')!));
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleModeChange = useCallback(() => {
    setDarkMode((prev: boolean) => !prev);

    localStorage.setItem('DARK_MODE', JSON.stringify(!darkMode));
  }, [darkMode]);

  const handleCancelModal = useCallback(() => {
    setShowModalSetting(false);
  }, [setShowModalSetting]);

  const handleClick = useCallback(() => {
    setDisplayColorPicker((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setDisplayColorPicker(false);
  }, []);

  const handleChange = useCallback(
    (color: any) => {
      setColorsLocalStorage(color?.hex);
      setColorDeadline(color?.hex);
    },
    [setColorsLocalStorage]
  );

  const styles: any = reactCSS({
    default: {
      swatch: {
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  const handleOk = useCallback(() => {
    setColorType([...filteredType, ...newColorDeadline]);
  }, [filteredType, newColorDeadline, setColorType]);

  return (
    <Modal visible={isShowSettingsModal} onCancel={handleCancelModal} title="Settings" footer={null} width={1000}>
      <div>
        <div className="switch-theme">
          <span>Select theme:</span>
          <Switch
            onClick={handleModeChange}
            defaultChecked={darkMode}
            checkedChildren={<LeftCircleOutlined style={{ fontSize: '18px' }} />}
            style={darkMode ? { background: '#383434' } : {}}
            unCheckedChildren={<RightCircleOutlined style={{ fontSize: '18px' }} />}
          />
        </div>
        <div className="setting-picker">
          <div>Change color events:</div>
          <div className="color-scroll">
            <div className="color-picker-events">
              <div>
                <div style={styles.swatch} onClick={handleClick}>
                  <div style={{ background: `${colorDeadline}`, width: '30px', height: '30px', borderRadius: '50%' }} />
                </div>
                {displayColorPicker ? (
                  <div style={styles.popover}>
                    <div style={styles.cover} onClick={handleClose} />
                    <SketchPicker color={colorDeadline} onChange={handleChange} />
                  </div>
                ) : null}
              </div>
              <div className="events-type">deadline</div>
            </div>
          </div>
        </div>
      </div>
      <div className="settings-button">
        <Button onClick={handleOk}>Ok</Button>
        <Button onClick={handleCancelModal}>Exit</Button>
      </div>
    </Modal>
  );
};
