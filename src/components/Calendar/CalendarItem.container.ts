import { connect } from 'react-redux';
import { getDataEvent } from '../../reducers';
import { CalendarItem } from './CalendarItem';

const mapStateToProps = (state: any) => {
  return {
    isShowCalendarOrTable: state.isShowCalendarOrTable,
    data: state.reducer.data,
  };
};

export const CalendarItemContainer = connect(mapStateToProps, { getDataEvent })(CalendarItem);
