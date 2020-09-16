import { Calendar, Tag } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import React, { FC, useCallback } from 'react';
import { events } from '../../mocks/events';
import { switchTypeToColor } from '../utilities/switcher';
import './Calendar.scss';
import { CalendarItemProps } from './CalendarItem.model';

export const CalendarItem: FC<CalendarItemProps> = React.memo(({ isShowCalendarOrTable }) => {
  const getListData = useCallback((value: moment.Moment) => {
    let listData: { type: string; content: string }[] = [];
    events.map((i) =>
      i.events.map((i) => {
        switch (value.date()) {
          case +i.dateTime.slice(0, 2):
            listData.push({
              type: i.type,
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
        <>
          <ul className="events">
            {listData.map((item: any) => (
              <li key={item.content}>
                <Tag key={item.content} color={switchTypeToColor(item.type)} className="size">
                  {item.content}
                </Tag>
              </li>
            ))}
          </ul>
        </>
      );
    },
    [getListData]
  );

  return (
    <div className="calendar" style={{ width: '100px' }}>
      <Calendar dateCellRender={dateCellRender} />
    </div>
  );
});
