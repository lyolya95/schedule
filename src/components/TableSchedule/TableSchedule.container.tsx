import { connect } from 'react-redux';
import { getDataEvent } from '../../reducers';
import { TableScheduleContainer } from './TableScheduleContainer';
import React, { useEffect, useState } from 'react';
import { Alert, Spin } from 'antd';

const Container = (props: any) => {
  const [preloader, setPreloader] = useState(true);

  useEffect(() => {
    if (props.data.length < 1) {
      props.getDataEvent();
      setPreloader(true);
    } else {
      setPreloader(false);
    }
  }, [props]);

  return preloader ? (
    <Spin tip="Loading...">
      <Alert message="Data of table" description="Loading" type="info" />
    </Spin>
  ) : (
    <TableScheduleContainer {...props} />
  );
};

const mapStateToProps = (state: any) => {
  return {
    data: state.data,
    isMentorStatus: state.isMentorStatus,
  };
};

export const TableSchedule = connect(mapStateToProps, { getDataEvent })(Container);
