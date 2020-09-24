import { connect } from 'react-redux';
import { getDataEvent, putDataEvent, getOrganizers, addDataEvent, deleteDataEvent } from '../../reducers';
import { TableScheduleContainer } from './TableScheduleContainer';
import React, { useEffect, useState } from 'react';
import { Alert, Spin } from 'antd';
import { StateModel } from '../../reducers/reducers.model';

const Container = (props: any) => {
  const [preloader, setPreloader] = useState(true);
  useEffect(() => {
    const firstLoadTable = async () => {
      setPreloader(true);
      await props.getDataEvent();
      await props.getOrganizers();
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
  };
};

const TableSchedule = connect(mapStateToProps, {
  getDataEvent,
  putDataEvent,
  getOrganizers,
  addDataEvent,
  deleteDataEvent,
})(Container);

export { TableSchedule };
