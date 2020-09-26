import React, { FC } from 'react';
import { TaskPageProps } from './TaskPage.model';
import { MentorTaskFormContainer } from '../MentorTaskForm/MentorTaskForm.container';
import ReactMarkdown from 'react-markdown';
import FeedbackForm from '../FeedbackForm';
import './TaskPage.scss';

export const TaskPage: FC<TaskPageProps> = React.memo((props) => {
  const { eventData, isMentorStatus } = props;
  const taskContentHtml = React.createElement(ReactMarkdown, { source: eventData.taskContent });

  return (
    <div>
      <h1>{eventData.name}</h1>
      <div>
        <b>Date:</b> {eventData.date}
      </div>
      <div>
        <b>Type:</b> {eventData.type}
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
