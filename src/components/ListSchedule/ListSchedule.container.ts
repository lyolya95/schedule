import { connect } from 'react-redux';
import { getDataEvent, setShowModaViewEvent } from '../../reducers';
import { StateModel } from '../../reducers/reducers.model';
import { ListSchedule } from './ListSchedule';

const mapStateToProps = (state: StateModel) => {
  return {
    isMentorStatus: state.isMentorStatus,
    data: state.data,
    types: state.types,
    isShowModalViewEvents: state.isShowModalViewEvents,
  };
};

export const ListScheduleContainer = connect(mapStateToProps, { getDataEvent, setShowModaViewEvent })(ListSchedule);
