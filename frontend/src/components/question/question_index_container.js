import { connect } from 'react-redux';
import { fetchQuestions } from '../../actions/question_actions';
import QuestionIndex from './question_index';

const mapStateToProps = (state) => {
  // debugger
  return {
    currentUser: state.session.user,
    questions: Object.values(state.questions.all)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchQuestions: () => dispatch(fetchQuestions())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionIndex);