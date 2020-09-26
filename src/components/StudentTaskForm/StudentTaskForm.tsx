import React, { FC,useState }  from 'react';
import { StudentTaskFormProps } from './StudentTaskForm.model';
import ReactMarkdown from 'react-markdown';
import { FeedbackFormContainer } from '../FeedbackForm/FeedbackForm.container';
import { Maps } from '../Maps';

export const StudentTaskForm:FC<StudentTaskFormProps> = (props) => {
  const { eventData, putDataEvent } = props;
  const taskContentHtml = React.createElement(ReactMarkdown, {source: eventData.taskContent});
 
  return(
      <div>
        {taskContentHtml}
        {eventData.isShowFeedback 
          ? <FeedbackFormContainer />
          : null
        }
         <Maps 
          isMentorStatus={false}
          chosenCoordinates = {eventData.coordinates}
         />
    </div>
   );
}
