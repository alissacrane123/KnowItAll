import { connect } from 'react-redux';
import { poseQuestion } from '../../actions/question_actions';
import { createAnswer } from '../../actions/answer_actions';
import QuestionCompose from './question_compose';
import { create } from 'domain';

const mapStateToProps = (state) => {
  // debugger
  return {
    currentUser: state.session.user,
    newQuestion: state.questions.new
    // newQuestion: state.questions.new
  };
};

const mapDispatchToProps = dispatch => {
  return {
    poseQuestion: data => dispatch(poseQuestion(data)),
    createAnswer: answer => dispatch(createAnswer(answer))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCompose);