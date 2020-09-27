import { connect } from 'react-redux';
import { StateModel } from '../../reducers/reducers.model';
import { putDataEvent } from '../../reducers';
import { MentorTaskForm } from './MentorTaskForm';

const mapStateToProps = (state: StateModel) => {
  return ;
};
const MentorTaskFormContainer = connect(mapStateToProps, {putDataEvent})(MentorTaskForm);

export { MentorTaskFormContainer };