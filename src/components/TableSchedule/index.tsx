import { connect } from 'react-redux';
import { setDataEventsAC } from '../../reducers/table-reducer';
import { TableScheduleContainer } from './TableScheduleContainer';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const Container = (props: any) => {
  const [preloader, setPreloader] = useState(true);
  useEffect(() => {
    props.data.length === 0 ? setPreloader(true) : setPreloader(false);
  }, [props.data]);
  Axios.get('https://rs-react-schedule.firebaseapp.com/api/team/44/events').then((response) => {
    props.setDataEvent(response.data.data);
  });
  return preloader ? <div>Жди</div> : <TableScheduleContainer {...props} />;
};

let mapStateToProps = (state: any) => {
  return {
    data: state.eventsData.data,
  };
};
let mapDispatchToProps = (dispatch: any) => {
  return {
    setDataEvent: (data: any) => {
      dispatch(setDataEventsAC(data));
    },
  };
};

export const TableScheduleIndex = connect(mapStateToProps, mapDispatchToProps)(Container);
