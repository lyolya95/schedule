import React, {FC, useState, useRef} from 'react';
import ReactMarkdown from 'react-markdown';
import MdEditor, { Plugins }  from 'react-markdown-editor-lite';
import ModeToggleMDHtml from './modeToggleMDHtml';
import {Button} from 'antd';

import 'react-markdown-editor-lite/lib/index.css';

type StateType = {
    value: string;
}
interface PropsType {
   currTaskContent:string;
   handleSave(text:string):void;
}
 const TaskEditor:FC<PropsType> = (props)=> {
   
    const {currTaskContent, handleSave} = props;
    MdEditor.unuse(Plugins.ModeToggle);
    MdEditor.unuse(Plugins.FullScreen);
    MdEditor.use(ModeToggleMDHtml);
    
    const mdEditor= useRef<MdEditor>(null);
    const [state, setState] = useState<StateType>({value: currTaskContent});
  
    const renderHTML = (text: string)=> {
        return React.createElement(ReactMarkdown, {
          source: text,
        });
      }

    const handleEditorChange = (it: { text: string; html: string }, event: any) => {
      setState({
         value: it.text,
       });
     };

     const handleImageUpload = (file:Blob) => {
        return new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = data => {
            // @ts-ignore
            resolve(data.target.result);
          };
          reader.readAsDataURL(file);
        });
      };

      const handleSaveClick = () => {
        if (mdEditor.current) {
          handleSave(mdEditor.current.getMdValue());
        }
       }

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
            <Button 
              type="primary" 
              size="large"
              onClick={handleSaveClick}
            >
              Save changes
            </Button>
          </div>
      
      );
     
}
export default TaskEditor;