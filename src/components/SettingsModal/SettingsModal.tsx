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
  const [darkMode, setDarkMode] = useState<any>(JSON.parse(localStorage.getItem('DARK_MODE') || '{}'));
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState<any>({
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  });

  const [colorsLocalStorage, setColorsLocalStorage] = useStickyState([], 'colors');

  const newColorDeadline = types.filter((i) => i.type === 'deadline').map((i) => ({ ...i, color: color }));
  const filteredType = types.filter((i) => i.type !== 'deadline');

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleModeChange = useCallback(() => {
    setDarkMode((prev: any) => !prev);

    localStorage.setItem('DARK_MODE', JSON.stringify(!darkMode));
  }, [darkMode]);

  const handleCancelModal = useCallback(() => {
    setShowModalSetting(false);
  }, []);

  const handleClick = useCallback(() => {
    setDisplayColorPicker((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setDisplayColorPicker(false);
  }, []);

  const handleChange = useCallback((color: any) => {
    setColor(color?.hex);
  }, []);

  const styles: any = reactCSS({
    default: {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '50%',
        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      },
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

  const handleOk = () => {
    setColorType([...filteredType, ...newColorDeadline]);
  };

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
                  <div style={{ background: `${color}`, width: '30px', height: '30px', borderRadius: '50%' }} />
                </div>
                {displayColorPicker ? (
                  <div style={styles.popover}>
                    <div style={styles.cover} onClick={handleClose} />
                    <SketchPicker color={color} onChange={handleChange} />
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
