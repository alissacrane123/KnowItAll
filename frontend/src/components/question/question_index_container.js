import { connect } from 'react-redux';
import { fetchQuestions } from '../../actions/question_actions';
import { fetchFriends, fetchFriend } from '../../actions/friend_actions';

import QuestionIndex from './question_index';

const mapStateToProps = (state) => {
  // debugger
  return {
    currentUser: state.session.user,
    questions: Object.values(state.questions.all),
    friends: Object.values(state.users.friends)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchQuestions: () => dispatch(fetchQuestions()),
    fetchFriends: (currentUserId) => dispatch(fetchFriends(currentUserId)),
    fetchFriend: (friendId) => dispatch(fetchFriend(friendId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionIndex);