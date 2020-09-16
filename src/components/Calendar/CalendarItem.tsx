import { Badge, Calendar } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import React, { FC, useCallback } from 'react';
import { events } from '../../mocks/events';
import './Calendar.scss';
import { CalendarItemProps } from './CalendarItem.model';

export const CalendarItem: FC<CalendarItemProps> = React.memo(({ isShowCalendarOrTable }) => {
  const getListData = useCallback((value: moment.Moment) => {
    let listData: { type: string; content: string }[] = [];
    events.map((i) =>
      i.events.map((i) => {
        const type = i.type === 'deadline' ? 'error' : i.type === 'task' ? 'success' : i.type === 'live' && 'warning';
        switch (value.date()) {
          case +i.dateTime.slice(0, 2):
            listData.push({
              type: `${type}`,
              content: i.name,
            });
            break;
          default:
        }
        return null;
      })
    );
    return listData || [];
  }, []);

  const dateCellRender = useCallback(
    (value: moment.Moment) => {
      const listData = getListData(value);
      return (
        <ul className="events">
          {listData.map((item: any) => (
            <li key={item.content}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      );
    },
    [getListData]
  );

  return (
    <div className="calendar">
      <Calendar dateCellRender={dateCellRender} />
    </div>
  );
});
