import { Badge, Calendar } from 'antd';
import 'antd/dist/antd.css';
import { CalendarMode } from 'antd/lib/calendar/generateCalendar';
import moment from 'moment';
import React from 'react';
import { events } from '../../mocks/events';
import './Calendar.scss';

export const CalendarItem = () => {

  const titleCourse = events.map((i) => i.course)[0];

  const getListData = (value: moment.Moment) => {
    let listData: {type: string, content: string}[] = [];
    events.map((i) =>
      i.events.map((i) => {
        const type = i.type === 'deadline' ? 'error' : i.type === 'task' ? 'success' : i.type === 'live' && 'warning';
        switch (value.date()) {
          case +i.date.slice(0, 2): 
            listData.push(
              {
                type: `${type}`,
                content: i.name,
              },
            );
            break;
          default:
        }
      })
    );
    return listData || [];
  };

  const dateCellRender = (value: moment.Moment) => {
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
  };
  const onPanelChange = (value: moment.Moment, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <div>
      <div className="calendar-title">
        <span>Calendar</span>
        <span>{titleCourse}</span>
      </div>
      <Calendar onPanelChange={onPanelChange} dateCellRender={dateCellRender} />
    </div>
  );
};
