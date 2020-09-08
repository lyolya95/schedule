import { CalendarOutlined, TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useMemo } from 'react';
import { events } from '../../mocks/events';
import { FirstLogo } from '../../styles/basic-styles';

export const Header = () => {
  const titleCourse = useMemo(() => events.map((i) => i.course)[0], []);

  return (
    <div>
      <FirstLogo />
      <div className="calendar-title">
        <span>Calendar</span>
        <span>{titleCourse}</span>
      </div>
      <Button>
        <CalendarOutlined /> || <TableOutlined />
      </Button>
      <Button>
        <UnorderedListOutlined />
      </Button>
      <Button>Autorizate</Button>
    </div>
  );
};
