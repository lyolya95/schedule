import React, { FC,useState }  from 'react';
import { StudentTaskFormProps } from './StudentTaskForm.model';
import ReactMarkdown from 'react-markdown';
import { FeedbackForm } from '../FeedbackForm/FeedbackForm';
import { Maps } from '../Maps';

export const StudentTaskForm:FC<StudentTaskFormProps> = (props) => {
  const { eventData, putDataEvent } = props;
  const taskContentHtml = React.createElement(ReactMarkdown, {source: eventData.taskContent});
 
  return(
      <div>
        {taskContentHtml}
        {eventData.isShowFeedback 
          ? <FeedbackForm />
          : null
        }
         <Maps 
          isMentorStatus={false}
          chosenCoordinates = {eventData.coordinates}
         />
    </div>
   );
}
