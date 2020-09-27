import { Badge, Calendar, Tag } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { EventOfInterface } from '../../reducers/reducers.model';
import { useMediaQuery } from '../MediaQuery/MediaQuery';
import { ModalViewEvents } from '../ModalViewEvent/ModalViewEvent';
import './Calendar.scss';
import { CalendarItemProps } from './CalendarItem.model';

export const CalendarItem: FC<CalendarItemProps> = React.memo(
  ({ data, getDataEvent, types, isShowModalViewEvents, setShowModaViewEvent }) => {
    const isRowBased = useMediaQuery('(min-width: 800px)');
    const [event, setEvent] = useState<EventOfInterface[]>([]);

    useEffect(() => {
      getDataEvent();
    }, [getDataEvent]);

    const getListData = useCallback(
      (value: moment.Moment) => {
        let listData: { type: string; content: string; id: string | undefined }[] = [];

        data.map((i: EventOfInterface) => {
          if (+i?.dateTime?.slice(5, 7) - 1 === value.month()) {
            switch (value.date()) {
              case +i?.dateTime?.slice(8, 10):
                listData.push({
                  type: i.type,
                  content: i.name,
                  id: i.id,
                });

                break;
              default:
            }
          }
          return null;
        });
        return listData || [];
      },
      [data]
    );

    const handleClickEvent = useCallback(
      (value) => {
        setEvent(data.filter((i: EventOfInterface) => i.id === value));
        setShowModaViewEvent(true);
      },
      [setShowModaViewEvent, data]
    );

    const dateCellRender = useCallback(
      (value: moment.Moment) => {
        const listData = getListData(value);
        return (
          <>
            <ul className="events">
              {listData.map((item, index: number) => (
                <li key={index}>
                  {isRowBased ? (
                    <Tag
                      color={types?.filter((i) => i.type === item.type)[0]?.color}
                      className="size"
                      onClick={() => handleClickEvent(item.id)}
                    >
                      {item.content}
                    </Tag>
                  ) : (
                    <Badge color={types?.filter((i) => i.type === item.type)[0]?.color}></Badge>
                  )}
                </li>
              ))}
            </ul>
          </>
        );
      },
      [getListData, isRowBased, types, handleClickEvent]
    );

    return (
      <div className={`${isRowBased ? 'calendar' : 'site-calendar-demo-card'}`}>
        <Calendar dateCellRender={dateCellRender} fullscreen={isRowBased} />
        {isShowModalViewEvents && (
          <ModalViewEvents
            isShowModalViewEvents={isShowModalViewEvents}
            setIsShowModalViewEvents={setShowModaViewEvent}
            event={event}
            types={types}
          />
        )}
      </div>
    );
  }
);
