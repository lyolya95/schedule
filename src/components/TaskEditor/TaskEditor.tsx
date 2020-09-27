import { Button, Switch } from 'antd';
import React, { FC, useRef, useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import MdEditor, { Plugins } from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Maps } from '../Maps';
import ModeToggleMDHtml from './modeToggleMDHtml';
import './TaskEditor.scss';

type StateType = {
  value: string;
};
interface PropsType {
  currTaskContent: string;
  chosenCoordinates: number[];
  showMap: boolean;
  handleSave(text: string, coords: number[], showMap: boolean): void;
  handleCancel(): void;
}
const TaskEditor: FC<PropsType> = (props) => {
  const { currTaskContent, chosenCoordinates, showMap, handleSave, handleCancel } = props;

  MdEditor.unuse(Plugins.ModeToggle);
  MdEditor.unuse(Plugins.FullScreen);
  MdEditor.use(ModeToggleMDHtml);

  const mdEditor = useRef<MdEditor>(null);
  const [state, setState] = useState<StateType>({ value: currTaskContent});
  const [coords, setCoords] = useState<number[]>(chosenCoordinates);
  const [isShowMap, setIsShowMap] = useState<boolean>(showMap);

  const renderHTML = (text: string) => {
    return React.createElement(ReactMarkdown, {
      source: text,
    });
  };

  const handleEditorChange = (it: { text: string; html: string }, event: any) => {
    setState({
      value: it.text
    });
  };

  const handleImageUpload = (file: Blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (data) => {
        // @ts-ignore
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSaveClick = () => {
    if (mdEditor.current) {
      handleSave(mdEditor.current.getMdValue(), coords, isShowMap);
    }
  };

  const handleCancelClick = useCallback(
    () => {
      handleCancel();
    },
    [handleCancel]
  );
  const changeCoords = useCallback(
    ( coordsNew:number[] ) => {
      setCoords(coordsNew);
    },
    [setCoords]
  );

  const onSwitchChange = useCallback(
     () => {
      setIsShowMap((state) => {
        return !state;
      });
    },
    [setIsShowMap]
  );

  return (
    <div className="task-editor">
      <MdEditor
        ref={mdEditor}
        value={state.value}
        style={{ height: '300px', width: '100%' }}
        renderHTML={renderHTML}
        config={{
          view: {
            menu: true,
            md: true,
            fullScreen: false,
            hideMenu: true,
          },
          table: {
            maxRow: 5,
            maxCol: 6,
          },
          syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
        }}
        onChange={handleEditorChange}
        onImageUpload={handleImageUpload}
      />
      <div className="map-switcher">
        <Switch checked={isShowMap} onChange={onSwitchChange} />
      {isShowMap 
        ? <span>Show map</span>
        : <span>Not show map</span>
        
      }
      </div>
      {isShowMap
        ? <Maps 
          isMentorStatus={true}
          chosenCoordinates={coords}
          changeCoords={changeCoords}
          />
        : null
        }
      <Button type="primary" size="large" onClick={handleSaveClick}>
        Save changes
      </Button>
      <Button size="large" onClick={handleCancelClick}>
        Cancel
      </Button>
    </div>
  );
};
export default TaskEditor;
