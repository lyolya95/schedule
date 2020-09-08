import { Badge, Calendar } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import React, { useCallback, useMemo } from 'react';
import { events } from '../../mocks/events';
import { eventsTitleCalendar } from '../../mocks/eventsTitleCalendar';
import './Calendar.scss';

export const CalendarItem = () => {
  const eventsTitle = useMemo(() => {
    return eventsTitleCalendar.map((item: any) => (
      <li key={item.content}>
        <Badge status={item.type} text={item.content} />
      </li>
    ));
  }, []);
  const getListData = useCallback((value: moment.Moment) => {
    let listData: { type: string; content: string }[] = [];
    events.map((i) =>
      i.events.map((i) => {
        const type = i.type === 'deadline' ? 'error' : i.type === 'task' ? 'success' : i.type === 'live' && 'warning';
        switch (value.date()) {
          case +i.date.slice(0, 2):
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
      <ul className="events-title">{eventsTitle}</ul>
      <Calendar dateCellRender={dateCellRender} />
    </div>
  );
};
