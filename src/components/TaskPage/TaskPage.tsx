import React, { FC } from 'react';
import { TaskPageProps } from './TaskPage.model';
import MentorTaskForm from '../MentorTaskForm';
import ReactMarkdown from 'react-markdown';
import FeedbackForm from '../FeedbackForm';
import './TaskPage.scss';

export const TaskPage: FC<TaskPageProps> = React.memo((props) => {
  const { name, date, type, organizer, taskContent, isShowFeedback, isMentorStatus } = props;
  const taskContentHtml = React.createElement(ReactMarkdown, { source: taskContent });

  //const [showFeedback, setShowFeedback] = useState(isShowFeedback);

  /*  useEffect( () => {
      console.log('use');
      return function cleanup() {
        console.log('del use');
        setShowFeedback(false);
      }
    },[showFeedback]);*/

  return (
    <div>
      <h1>{name}</h1>
      <div>
        <b>Date:</b> {date}
      </div>
      <div>
        <b>Type:</b> {type}
      </div>
      <div className="mb20">
        <b>Organizer:</b> {organizer}
      </div>

      {isMentorStatus ? (
        <MentorTaskForm taskContent={taskContent} isShowFeedback={isShowFeedback} />
      ) : (
        <div>
          {taskContentHtml}
          <FeedbackForm />
        </div>
      )}
    </div>
  );
});
