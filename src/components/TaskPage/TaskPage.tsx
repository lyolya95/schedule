import React, { FC } from 'react';
import { Tag, Rate } from 'antd';
import { TaskPageProps } from './TaskPage.model';
import { MentorTaskFormContainer } from '../MentorTaskForm/MentorTaskForm.container';
import { StudentTaskForm } from '../StudentTaskForm/StudentTaskForm';
import './TaskPage.scss';

export const TaskPage: FC<TaskPageProps> = React.memo((props) => {
  const { eventData, isMentorStatus, types } = props;
 
  return (
    <div>
      <h1>{eventData.name}</h1>
      {eventData.dateTime
        ? <div>
            <b>Date:</b> {eventData.dateTime}
          </div>
          
      : null
      }
      {eventData.timeToComplete  
        ? <div>
        <b>TimeToComplete:</b> {eventData.timeToComplete}
      </div>
      : null
      }
      {eventData.type
        ? <div>
            <b>Type:</b> <Tag 
                          className="size" 
                          key={eventData.type} 
                          color={types?.filter((i: any) => i.type === eventData.type)[0]?.color}
                        >
                          {eventData.type}
                        </Tag>
          </div>
      : null
      }
      {eventData.organizer && eventData.organizer!==''
        ? <div>
            <b>Organizer:</b> {eventData.organizer}
          </div>
        : null
      }
      {eventData.place  
        ? <div>
        <b>Place:</b> {eventData.place}
      </div>
      : null
      }
      {eventData.week  
        ? <div>
        <b>Week of course:</b> {eventData.week}
      </div>
      : null
      }
      {!isMentorStatus && eventData.score && eventData.maxScore 
        ? <div>
        <b>Score:</b> {eventData.score}/{eventData.maxScore}
      </div>
      : null
      }

      <div className="mb20">
        <b>Rating: </b>
           <Rate disabled value={ eventData?.rating?.voted ? eventData?.rating?.sum / eventData?.rating?.voted : 0} />
      </div>  

      {isMentorStatus ? (
        <MentorTaskFormContainer 
          eventData={eventData} 
        />
      ) : (
        <StudentTaskForm 
          eventData={eventData} 
        />
      )}
    </div>
  );
});
