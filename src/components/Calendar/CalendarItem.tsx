import { Badge, Calendar, Tag } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import React, { FC, useCallback, useEffect } from 'react';
import { useMediaQuery } from '../MediaQuery/MediaQuery';
import { switchTypeToColor } from '../utilities';
import './Calendar.scss';
import { CalendarItemProps } from './CalendarItem.model';

export const CalendarItem: FC<CalendarItemProps> = React.memo(({ data, getDataEvent }) => {
  const isRowBased = useMediaQuery('(min-width: 800px)');

  useEffect(() => {
    getDataEvent();
  }, [getDataEvent]);

  const getListData = useCallback(
    (value: moment.Moment) => {
      let listData: { type: string; content: string }[] = [];
      data.map((i: any) => {
        switch (value.date()) {
          case +i?.dateTime?.slice(8, 10):
            listData.push({
              type: i.type,
              content: i.name,
            });
            break;
          default:
        }
        return null;
      });
      return listData || [];
    },
    [data]
  );

  const dateCellRender = useCallback(
    (value: moment.Moment) => {
      const listData = getListData(value);
      return (
        <>
          <ul className="events">
            {listData.map((item: any, index: number) => (
              <li key={index}>
                {isRowBased ? (
                  <Tag color={switchTypeToColor(item.type)} className="size">
                    {item.content}
                  </Tag>
                ) : (
                  <Badge color={switchTypeToColor(item.type)}></Badge>
                )}
              </li>
            ))}
          </ul>
        </>
      );
    },
    [getListData, isRowBased]
  );

  return (
    <div className={`${isRowBased ? 'calendar' : 'site-calendar-demo-card'}`}>
      <Calendar dateCellRender={dateCellRender} fullscreen={isRowBased} />
    </div>
  );
});
