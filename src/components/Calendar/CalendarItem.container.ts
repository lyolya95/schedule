import { connect } from 'react-redux';
import { getDataEvent } from '../../reducers';
import { CalendarItem } from './CalendarItem';

const mapStateToProps = (state: any) => {
  return {
    isMentorStatus: state.isMentorStatus,
    data: state.data,
  };
};

export const CalendarItemContainer = connect(mapStateToProps, { getDataEvent })(CalendarItem);
