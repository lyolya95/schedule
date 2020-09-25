import { Alert, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addDataEvent, deleteDataEvent, getDataEvent, getOrganizers, putDataEvent, StateModel } from '../../reducers';
import { TableScheduleContainer } from './TableScheduleContainer';

const Container = (props: any) => {
  const [preloader, setPreloader] = useState(true);

  useEffect(() => {
    if (props.data.length < 1) {
      props.getDataEvent();
      props.getOrganizers();
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

const mapStateToProps = (state: StateModel) => {
  return {
    data: state.data,
    isMentorStatus: state.isMentorStatus,
    columnsName: state.columnsName,
    notEditableColumns: state.notEditableColumns,
    ratingVotes: state.ratingVotes,
    organizers: state.organizers,
    initialEventData: state.initialEventData,
    types: state.types,
  };
};

export const TableSchedule = connect(mapStateToProps, {
  getDataEvent,
  putDataEvent,
  getOrganizers,
  addDataEvent,
  deleteDataEvent,
})(Container);
