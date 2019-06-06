import { connect } from 'react-redux';
import { poseQuestion } from '../../actions/question_actions';
import { createAnswer, updateAnswer } from '../../actions/answer_actions';
import QuestionCompose from './question_compose';
import { create } from 'domain';
import { fetchResults, clearResults } from '../../actions/result_actions';


const mapStateToProps = (state, ownProps) => {
  let friendId;
  let friendName;
  // debugger
  if (ownProps.location.state !== undefined ) {
    friendId = ownProps.location.state.friendId;
    friendName = state.users.users[friendId].username;
  } else {
    friendId = null;
  }
  // debugger
  return {
    currentUser: state.session.user,
    newQuestion: state.questions.new,
    results: state.results.all,
    friendId,
    friendName
    // newQuestion: state.questions.new
  };
};

const mapDispatchToProps = dispatch => {
  return {
    poseQuestion: data => dispatch(poseQuestion(data)),
    createAnswer: answer => dispatch(createAnswer(answer)),
    fetchResults: data => dispatch(fetchResults(data)),
    clearResults: () => dispatch(clearResults()),
    updateAnswer: (data) => dispatch(updateAnswer(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCompose);