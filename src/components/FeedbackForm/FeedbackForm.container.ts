import { connect } from 'react-redux';
import { StateModel } from '../../reducers/reducers.model';
import { putDataEvent } from '../../reducers';
import { FeedbackForm } from './FeedbackForm';

const mapStateToProps = (state: StateModel) => {
  return {
    isMentorStatus: state.isMentorStatus,
  };
};
const FeedbackFormContainer = connect(mapStateToProps, {putDataEvent})(FeedbackForm);

export { FeedbackFormContainer };