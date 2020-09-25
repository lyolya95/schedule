import { connect } from 'react-redux';
import { StateModel } from '../../reducers/reducers.model';
import { TaskPage } from './TaskPage';

const mapStateToProps = (state: StateModel) => {
  return {
    isMentorStatus: state.isMentorStatus,
  };
};
const TaskPageContainer = connect(mapStateToProps)(TaskPage);

export { TaskPageContainer };
