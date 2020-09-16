import { CalendarOutlined, TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { events } from '../../mocks/events';
import { FirstLogo } from '../../styles/basic-styles';
import { HeaderProps } from './Header.model';
import './Header.scss';

export const Header: FC<HeaderProps> = React.memo(({ isShowCalendarOrTable }) => {
  const [showCalendar, setShowCalendar] = useState(isShowCalendarOrTable);
  const history = useHistory();

  const titleCourse = useMemo(() => events.map((i) => i.course)[0], []);

  const handleShowCalendar = useCallback(() => {
    setShowCalendar((prev) => !prev);
    !showCalendar ? history.push('/calendar') : history.push('/');
  }, [history, showCalendar]);

  return (
    <div className="header">
      <FirstLogo />
      <div className="calendar-title">
        <span> {showCalendar && 'Calendar  '}</span>
        <span>{titleCourse}</span>
      </div>

      <div className="btn-header">
        <Button onClick={handleShowCalendar}>{showCalendar ? <TableOutlined /> : <CalendarOutlined />}</Button>
        <Button>
          <UnorderedListOutlined />
        </Button>
        <Button>Autorizate</Button>
      </div>
    </div>
  );
});
