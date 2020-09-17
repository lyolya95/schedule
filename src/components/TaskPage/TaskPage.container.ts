import { connect } from 'react-redux';
import  {StateModel}  from '../../reducers';
import { TaskPage } from './TaskPage';

const mapStateToProps = (state: StateModel) => {
  return {
    isMentorStatus: state.isMentorStatus,
  };
};

export const TaskPageContainer = connect(mapStateToProps)(TaskPage);
