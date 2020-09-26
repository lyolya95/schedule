import React, { FC,useState }  from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import TaskEditor from '../TaskEditor';
import {MentorTaskFormProps} from './MentorTaskForm.model';
import ReactMarkdown from 'react-markdown';
import {EditFilled} from '@ant-design/icons';
import { Checkbox } from 'antd';

export const MentorTaskForm:FC<MentorTaskFormProps> = (props) => {
  const { eventData, putDataEvent } = props;
  const [editStatus, setEditStatus] = useState(false);
  const [isShowFeedback, setShowFeedback] = useState(eventData.isShowFeedback);
  const taskContentHtml = React.createElement(ReactMarkdown, {source: eventData.taskContent});

  const handleClick = () => {
    setEditStatus(true);
  }

  const handleSave = async (text:string) => {
    eventData.taskContent = text;
    await putDataEvent(eventData.id, eventData);
    setEditStatus(false);
  }

  const handleCancel = () => {
    setEditStatus(false);
  }

  const onChangeShowFeedback = async (e:CheckboxChangeEvent) =>{
    setShowFeedback(e.target.checked);
    eventData.isShowFeedback = e.target.checked;
    await putDataEvent(eventData.id, eventData);
  }

  return(
        <div>
          <Checkbox 
              onChange={onChangeShowFeedback}
              key = {eventData.id}
              checked={isShowFeedback}
          >
              Feedback is available for student
          </Checkbox>
                        
            { editStatus
              ? <div className="task-description">
                  <TaskEditor 
                    currTaskContent={eventData.taskContent}
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
