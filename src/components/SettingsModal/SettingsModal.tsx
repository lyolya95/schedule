import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Button, Switch } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import { useStickyState } from '../Filters/hooks/useStickyState';
import { SettingsModalProps } from './SettingsModal.model';
import './SettingsModal.scss';
import {SelectTimeZone} from "../SelectTimeZone/SelectTimeZone";

export const SettingsModal: FC<SettingsModalProps> = ({
  isShowSettingsModal,
  setShowModalSetting,
  types,
  setColorType,
  timeZone,
  setTimeZone,
  widthScreen,
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(JSON.parse(localStorage.getItem('DARK_MODE')!));
  const [displayColorDeadline, setDisplayColorDeadline] = useState(false);
  const [colorDeadline, setColorDeadline] = useState<string>('#FF69B4');
  const [, setColorsDeadlineLocalStorage] = useStickyState('', 'colorDeadline');
  const [displayColorTask, setDisplayColorTask] = useState(false);
  const [colorTask, setColorTask] = useState<string>('#00FF56');
  const [, setColorsTaskLocalStorage] = useStickyState('', 'colorTask');

  const newColorDeadline = types.filter((i) => i.type === 'deadline').map((i) => ({ ...i, color: colorDeadline }));
  const filteredType = types.filter((i) => i.type !== 'deadline' && !i.type.includes('task'));
  const newColorTask = types.filter((i) => i.type.includes('task')).map((i) => ({ ...i, color: colorTask }));

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('colorDeadline')!)) {
      setColorDeadline(JSON.parse(localStorage.getItem('colorDeadline')!));
    }
    if (JSON.parse(localStorage.getItem('colorTask')!)) {
      setColorTask(JSON.parse(localStorage.getItem('colorTask')!));
    }
    if (JSON.parse(localStorage.getItem('timeZone')!)) {
      setTimeZone(JSON.parse(localStorage.getItem('timeZone')!));
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

  const handleClickDeadline = useCallback(() => {
    setDisplayColorDeadline((prev) => !prev);
  }, []);

  const handleClickTask = useCallback(() => {
    setDisplayColorTask((prev) => !prev);
  }, []);

  const handleCloseDeadline = useCallback(() => {
    setDisplayColorDeadline(false);
  }, []);

  const handleCloseTask = useCallback(() => {
    setDisplayColorTask(false);
  }, []);

  const handleChangeDeadline = useCallback(
    (color: any) => {
      setColorsDeadlineLocalStorage(color?.hex);
      setColorDeadline(color?.hex);
    },
    [setColorsDeadlineLocalStorage]
  );

  const handleChangeTask = useCallback(
    (color: any) => {
      setColorsTaskLocalStorage(color?.hex);
      setColorTask(color?.hex);
    },
    [setColorsTaskLocalStorage]
  );

  const handleSetTimeZone = useCallback((value: string) => {
    setTimeZone(value);
    localStorage.setItem('timeZone', JSON.stringify(value));
  }, [setTimeZone])

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
    setColorType([...filteredType, ...newColorDeadline, ...newColorTask]);
    setShowModalSetting(false);
  }, [filteredType, newColorDeadline, setColorType, newColorTask, setShowModalSetting]);

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
        <div className="set-time-zone">
          <SelectTimeZone setTimeZone={handleSetTimeZone} defaultValue={timeZone} widthScreen={widthScreen}/>
        </div>
        <div className="setting-picker">
          <div>Change color events:</div>
          <div className="color-scroll">
            <div className="color-picker-events">
              <div>
                <div style={styles.swatch} onClick={handleClickDeadline}>
                  <div style={{ background: `${colorDeadline}`, width: '40px', height: '40px', borderRadius: '50%' }} />
                </div>
                {displayColorDeadline ? (
                  <div style={styles.popover}>
                    <div style={styles.cover} onClick={handleCloseDeadline} />
                    <SketchPicker color={colorDeadline} onChange={handleChangeDeadline} />
                  </div>
                ) : null}
              </div>
              <div className="events-type">deadline</div>
            </div>
            <div className="color-picker-events">
              <div>
                <div style={styles.swatch} onClick={handleClickTask}>
                  <div style={{ background: `${colorTask}`, width: '40px', height: '40px', borderRadius: '50%' }} />
                </div>
                {displayColorTask ? (
                  <div style={styles.popover}>
                    <div style={styles.cover} onClick={handleCloseTask} />
                    <SketchPicker color={colorTask} onChange={handleChangeTask} />
                  </div>
                ) : null}
              </div>
              <div className="events-type">task</div>
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
