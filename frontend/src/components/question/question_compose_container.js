import { connect } from 'react-redux';
import { poseQuestion } from '../../actions/question_actions';
import { createAnswer } from '../../actions/answer_actions';
import QuestionCompose from './question_compose';
import { create } from 'domain';
import { fetchResults } from '../../actions/result_actions';

const mapStateToProps = (state) => {
  // debugger
  return {
    currentUser: state.session.user,
    newQuestion: state.questions.new,
    results: state.results.all
    // newQuestion: state.questions.new
  };
};

const mapDispatchToProps = dispatch => {
  return {
    poseQuestion: data => dispatch(poseQuestion(data)),
    createAnswer: answer => dispatch(createAnswer(answer)),
    fetchResults: data => dispatch(fetchResults(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCompose);