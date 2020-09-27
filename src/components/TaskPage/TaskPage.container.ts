import { connect } from 'react-redux';
import { StateModel } from '../../reducers/reducers.model';
import { putDataEvent } from '../../reducers';
import { TaskPage } from './TaskPage';

const mapStateToProps = (state: StateModel) => {
  return {
    isMentorStatus: state.isMentorStatus,
    types: state.types,
  };
};
const TaskPageContainer = connect(mapStateToProps, {putDataEvent})(TaskPage);

export { TaskPageContainer };
