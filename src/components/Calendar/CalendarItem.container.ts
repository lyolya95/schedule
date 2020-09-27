import { connect } from 'react-redux';
import { getDataEvent, setShowModaViewEvent } from '../../reducers';
import { StateModel } from '../../reducers/reducers.model';
import { CalendarItem } from './CalendarItem';

const mapStateToProps = (state: StateModel) => {
  return {
    isMentorStatus: state.isMentorStatus,
    data: state.data,
    types: state.types,
    isShowModalViewEvents: state.isShowModalViewEvents,
  };
};

export const CalendarItemContainer = connect(mapStateToProps, { getDataEvent, setShowModaViewEvent })(CalendarItem);
