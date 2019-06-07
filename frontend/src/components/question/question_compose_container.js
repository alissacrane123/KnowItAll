import { connect } from 'react-redux';
import { poseQuestion } from '../../actions/question_actions';
import { createAnswer, updateAnswer } from '../../actions/answer_actions';
import QuestionCompose from './question_compose';
import { create } from 'domain';
import { fetchResults, clearResults } from '../../actions/result_actions';
import { fetchFriendByUsername } from '../../actions/friend_actions';


const mapStateToProps = (state, ownProps) => {
  let assignAvatar;

  if (ownProps.location.state !== undefined) {
    assignAvatar = ownProps.location.state.assignAvatar;
  } else {
    assignAvatar = null;
  }

  return {
    currentUser: state.session.user,
    newQuestion: state.questions.new,
    results: state.results.all,
    users: state.users,
    assignAvatar,
    stats: state.stats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    poseQuestion: data => dispatch(poseQuestion(data)),
    createAnswer: answer => dispatch(createAnswer(answer)),
    fetchResults: data => dispatch(fetchResults(data)),
    clearResults: () => dispatch(clearResults()),
    updateAnswer: (data) => dispatch(updateAnswer(data)),
    fetchFriendByUsername: (username) => dispatch(fetchFriendByUsername(username))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCompose);