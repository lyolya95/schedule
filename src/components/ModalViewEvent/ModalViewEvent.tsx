import { TagOutlined } from '@ant-design/icons';
import { Rate, Tag } from 'antd';
import Modal from 'antd/lib/modal/Modal';
//import moment from 'moment';
import React, { FC, useCallback } from 'react';
import { EventOfInterface } from '../../reducers/reducers.model';
import './ModalViewEvent.scss';

interface ModalViewEventsProps {
  isShowModalViewEvents: boolean;
  setIsShowModalViewEvents: (value: boolean) => void;
  event: EventOfInterface[];
  types: {
    type: string;
    color: string;
  }[];
}

export const ModalViewEvents: FC<ModalViewEventsProps> = ({
  isShowModalViewEvents,
  setIsShowModalViewEvents,
  event,
  types,
}) => {
  const handleCancel = useCallback(() => {
    setIsShowModalViewEvents(false);
  }, [setIsShowModalViewEvents]);
  
  
  const ratingMidValue  = event[0]?.rating?.voted ? event[0]?.rating?.sum / event[0]?.rating?.voted : 0;
  
  return (
    <Modal title={event[0]?.course} footer={null} visible={isShowModalViewEvents} onCancel={handleCancel}>
      <div className="modal_events">
        {event[0]?.name && (
          <div className="modal_events__item">
            <div>Event:</div>
            <div>{event[0]?.name}</div>
          </div>
        )}
        {event[0]?.dateTime && (
          <div className="modal_events__item">
            <div>Date:</div>
            <div><b>{event[0]?.dateTime+event[0]?.timeZone}</b></div>
          </div>
        )}
        {event[0]?.place && (
          <div className="modal_events__item">
            <div>Place:</div>
            <div>
              <TagOutlined /> {event[0]?.place}
            </div>
          </div>
        )}
        {event[0]?.type && (
          <div className="modal_events__item">
             <div>Type:</div>
            <Tag color={types?.filter((i) => i.type === event[0]?.type)[0]?.color} className="size">
              {event[0]?.type}
            </Tag>
          </div>
        )}
      
        {ratingMidValue && (
          <div className="modal_events__item">
            <Rate disabled value={ratingMidValue} />
          </div>
        )}
        {event[0]?.studentScore && (
          <div className="modal_events__item">
            <div>Score/MaxScore:</div>
            <div>{event[0]?.studentScore}/{event[0]?.maxScore}</div>
          </div>
        )}
        {event[0]?.taskContent && (
          <div className="modal_events__item">
            <div>Description:</div>
            <div>{event[0]?.taskContent}</div>
          </div>
        )}
        {event[0]?.timeToComplete && (
          <div className="modal_events__item">
            <div>Time complite: </div>
            <div>{event[0]?.timeToComplete}</div>
          </div>
        )}
        {event[0]?.week && (
          <div className="modal_events__item">
            <div>Week of course:</div>
            <div>{event[0]?.week}</div>
          </div>
        )}
        {event[0]?.descriptionUrl && (
          <div className="modal_events__item">
            <div>
              <a href={event[0].descriptionUrl}> more details</a>
            </div>
          </div>
        )}
        {event[0]?.taskContent && (
          <div className="modal_events__item">
            <div>
              {event[0]?.taskContent}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
