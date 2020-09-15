import { connect } from 'react-redux';
import { getDataEvent } from '../../reducers';
import { TableScheduleContainer } from './TableScheduleContainer';
import React, { useEffect, useState } from 'react';
import { Alert, Spin } from 'antd';

const Container = (props: any) => {
  const [preloader, setPreloader] = useState(true);
  useEffect(() => {
    props.data.length === 0 ? setPreloader(true) : setPreloader(false);
  }, [props.data]);
  props.getDataEvent();
  return preloader ? (
    <Spin tip="Loading...">
      <Alert message="Data of table" description="Loading" type="info" />
    </Spin>
  ) : (
    <TableScheduleContainer {...props} />
  );
};

let mapStateToProps = (state: any) => {
  return {
    data: state.reducer.data,
  };
};

export const TableSchedule = connect(mapStateToProps, { getDataEvent })(Container);
