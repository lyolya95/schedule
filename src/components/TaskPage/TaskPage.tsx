import React, { FC } from 'react';
import { Tag } from 'antd';
import { TaskPageProps } from './TaskPage.model';
import { MentorTaskFormContainer } from '../MentorTaskForm/MentorTaskForm.container';
import ReactMarkdown from 'react-markdown';
import FeedbackForm from '../FeedbackForm';
import './TaskPage.scss';

export const TaskPage: FC<TaskPageProps> = React.memo((props) => {
  const { eventData, isMentorStatus, types } = props;
  const taskContentHtml = React.createElement(ReactMarkdown, { source: eventData.taskContent });

  return (
    <div>
      <h1>{eventData.name}</h1>
      <div>
        <b>Date:</b> {eventData.date}
      </div>
      <div>
        <b>Type:</b> <Tag 
                      className="size" 
                      key={eventData.type} 
                      color={types?.filter((i: any) => i.type === eventData.type)[0]?.color}
                    >
                      {eventData.type}
                    </Tag>
      </div>
      <div className="mb20">
        <b>Organizer:</b> {eventData.organizer}
      </div>

      {isMentorStatus ? (
        <MentorTaskFormContainer 
          eventData={eventData} 
        />
      ) : (
        <div>
          {taskContentHtml}
          <FeedbackForm />
        </div>
      )}
    </div>
  );
});
