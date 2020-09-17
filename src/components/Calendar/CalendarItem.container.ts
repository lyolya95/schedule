import { connect } from 'react-redux';
import { getDataEvent } from '../../reducers';
import { CalendarItem } from './CalendarItem';

const mapStateToProps = (state: any) => {
  console.log('stCal=',state);
  return {
    isShowCalendarOrTable: state.isShowCalendarOrTable,
    isMentorStatus: state.isMentorStatus,
    data: state.data,
  };
};

export const CalendarItemContainer = connect(mapStateToProps, { getDataEvent })(CalendarItem);
