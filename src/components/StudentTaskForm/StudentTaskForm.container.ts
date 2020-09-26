import { connect } from 'react-redux';
import { StateModel } from '../../reducers/reducers.model';
import { putDataEvent } from '../../reducers';
import { StudentTaskForm } from './StudentTaskForm';

const mapStateToProps = (state: StateModel) => {
  return {
    isMentorStatus: state.isMentorStatus,
  };
};
const StudentTaskFormContainer = connect(mapStateToProps, {putDataEvent})(StudentTaskForm);

export { StudentTaskFormContainer };