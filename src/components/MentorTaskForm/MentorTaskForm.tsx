import React, {FC,useState}  from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import TaskEditor from '../TaskEditor';
import ReactMarkdown from 'react-markdown';
import {EditFilled} from '@ant-design/icons';
import { Checkbox } from 'antd';

type PropsType = {
  taskContent:string;
  isShowFeedback:boolean;
}

const MentorTaskForm:FC<PropsType> = (props) => {
  const {taskContent, isShowFeedback} = props;
  const [editStatus, setEditStatus] = useState(false);
  const [saveTaskContent, setSaveTaskContent] = useState(taskContent);
  const taskContentHtml = React.createElement(ReactMarkdown, {source: saveTaskContent});

  const handleClick = () => {
    setEditStatus(true);
  }

  const handleSave = (text:string) => {
    setSaveTaskContent(text);
    setEditStatus(false);
  }

  const handleCancel = () => {
    setEditStatus(false);
  }

  const onChangeShowFeedback = (e:CheckboxChangeEvent) =>{
    console.log('feed='+e.target.checked); 
    //записать данные в api
    //setShowFeedback(e.target.checked);
  }

  return(
        <div>
          <Checkbox 
              onChange={onChangeShowFeedback}
            //  checked={isShowFeedback}
              >
                  Feedback is available for student
              </Checkbox>
                        
            { editStatus
              ? <div className="task-description">
                  <TaskEditor 
                    currTaskContent={saveTaskContent}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                  />
                </div>
              : <div className="task-description">
                  <div className="icons-list">
                    <EditFilled 
                      label="Edit"
                      onClick={handleClick}
                      />
                  </div>
                  <div>
                    {taskContentHtml}
                  </div>
              </div>
            }
          </div>
  );
}

export default MentorTaskForm;