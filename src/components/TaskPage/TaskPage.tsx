import React, { FC} from 'react';
import MentorTaskForm from '../MentorTaskForm';
import ReactMarkdown from 'react-markdown';
import FeedbackForm from '../FeedbackForm';
import './TaskPage.scss';

type PropsType = {
    name:string;
    date:string;
    type:string;
    organizer:string;
    taskContent:string;
    isShowFeedback:boolean;
    isMentor:boolean;
  }

  type StateType = {
    value: boolean;
}
  const TaskPage:FC<PropsType> = (props) =>{
    
    const {name, date, type, organizer, taskContent, isShowFeedback, isMentor} = props;
    const taskContentHtml = React.createElement(ReactMarkdown, {source: taskContent});

    //const [showFeedback, setShowFeedback] = useState(isShowFeedback);
  
  /*  useEffect( () => {
      console.log('use');
      return function cleanup() {
        console.log('del use');
        setShowFeedback(false);
      }
    },[showFeedback]);*/


    return(
          <div>
            <h1>{name}</h1>
            <div><b>Date:</b> {date}</div>
            <div><b>Type:</b> {type}</div>
            <div className="mb20"><b>Organizer:</b> {organizer}</div>

            { isMentor
              ? <MentorTaskForm 
                taskContent={taskContent}
                isShowFeedback={isShowFeedback}
                />
              : <div>
                  {taskContentHtml}
                  <FeedbackForm />
                </div>
            }
              
          </div>
    )
}
export default TaskPage;