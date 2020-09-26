import { TagOutlined } from '@ant-design/icons';
import { DatePicker, Rate, Tag } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import moment from 'moment';
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
            <DatePicker defaultValue={moment(event[0]?.dateTime)} disabled />
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
            <Tag color={types?.filter((i) => i.type === event[0]?.type)[0]?.color} className="size">
              {event[0]?.type}
            </Tag>
          </div>
        )}
        {event[0]?.rating && (
          <div className="modal_events__item">
            <Rate disabled value={event[0]?.rating ? +event[0].rating : 0} />
          </div>
        )}
        {event[0]?.studentScore && (
          <div className="modal_events__item">
            <div>Score:</div>
            <div>{event[0]?.studentScore}</div>
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
            <div>Week complete:</div>
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
        {event[0]?.maxScore && (
          <div className="modal_events__item">
            <div>Max score solution: </div>
            <div>{event[0]?.maxScore}</div>
          </div>
        )}
      </div>
    </Modal>
  );
};
