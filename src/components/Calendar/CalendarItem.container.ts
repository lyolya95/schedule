import { connect } from 'react-redux';
import { StateModel } from '../../reducers';
import { CalendarItem } from './CalendarItem';

const mapStateToProps = (state: StateModel) => {
  return {
    isShowCalendarOrTable: state.isShowCalendarOrTable,
  };
};

export const CalendarItemContainer = connect(mapStateToProps)(CalendarItem);
