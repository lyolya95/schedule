import { connect } from 'react-redux';
import { getDataEvent } from '../../reducers';
import { StateModel } from './../../reducers/index';
import { CalendarItem } from './CalendarItem';

const mapStateToProps = (state: StateModel) => {
  return {
    isMentorStatus: state.isMentorStatus,
    data: state.data,
    types: state.types,
  };
};

export const CalendarItemContainer = connect(mapStateToProps, { getDataEvent })(CalendarItem);
