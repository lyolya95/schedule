import { Alert, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addDataEvent, deleteDataEvent, getDataEvent, putDataEvent } from '../../reducers';
import { StateModel } from '../../reducers/reducers.model';
import { TableScheduleContainer } from './TableScheduleContainer';

const Container = (props: any) => {
  const [preloader, setPreloader] = useState(true);
  useEffect(() => {
    const firstLoadTable = async () => {
      setPreloader(true);
      await props.getDataEvent();
      setPreloader(false);
    };
    firstLoadTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

const TableSchedule = connect(mapStateToProps, {
  getDataEvent,
  putDataEvent,
  addDataEvent,
  deleteDataEvent,
})(Container);

export { TableSchedule };
