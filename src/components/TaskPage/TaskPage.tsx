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
      <div>
        <b>Organizer:</b> {eventData.organizer}
      </div>
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
