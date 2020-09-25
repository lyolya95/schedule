import { CalendarOutlined, TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FirstLogo } from '../../styles/basic-styles';
import { HeaderProps } from './Header.model';
import './Header.scss';

export const Header: FC<HeaderProps> = React.memo(({ isMentorStatus, changeMentorStatus }) => {
  const history = useHistory();

  const handleShowTable = useCallback(() => {
      history.push('/');
  }, [history]);

  const handleShowCalendar = useCallback(() => {
    history.push('/calendar');
  }, [history]);

  const handleShowList = useCallback(() => {
    history.push('/list');
  }, [history]);


  return (
    <div className="header">
      <FirstLogo />
      <div className="calendar-title">
      </div>
      <div className="btn-header">
        <Button 
          onClick={handleShowTable}>
          <TableOutlined />
        </Button>
        <Button 
          onClick={handleShowCalendar}>
          <CalendarOutlined />
        </Button>
        <Button
          onClick={handleShowList}>
          <UnorderedListOutlined />
        </Button>
        <Button
          onClick={changeMentorStatus}
        >
          {isMentorStatus ? 'To Student App' : 'To Mentor App'}
        </Button>
      </div>
    </div>
  );
});
