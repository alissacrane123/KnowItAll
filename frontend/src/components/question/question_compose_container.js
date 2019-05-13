import { connect } from 'react-redux';
import { poseQuestion } from '../../actions/question_actions';
import QuestionCompose from './question_compose';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    newQuestion: state.questions.new
  };
};

const mapDispatchToProps = dispatch => {
  return {
    poseQuestion: data => dispatch(poseQuestion(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCompose);