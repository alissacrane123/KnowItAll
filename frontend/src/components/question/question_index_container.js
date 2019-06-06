import { connect } from 'react-redux';
import { fetchQuestions } from '../../actions/question_actions';
import { fetchFriends, fetchFriend, addFriend } from '../../actions/friend_actions';
import { fetchUser } from '../../actions/user_actions';
import { fetchUserAnswers } from '../../actions/answer_actions';
import { fetchUserStats } from '../../actions/stats_actions';

import QuestionIndex from './question_index';

const mapStateToProps = (state) => {
  // debugger
  return {
    currentUser: state.session.user,
    questions: Object.values(state.questions.all),
    // friends: Object.values(state.users.friends),
    friends: state.users.friends,
    users: state.users.users, // object
    newFriend: state.users.friend,
    answers: state.answers,
    stats: state.stats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchQuestions: () => dispatch(fetchQuestions()),
    fetchFriends: (currentUserId) => dispatch(fetchFriends(currentUserId)),
    fetchFriend: (friendId) => dispatch(fetchFriend(friendId)),
    addFriend: (data) => dispatch(addFriend(data)),
    fetchUser: userId => dispatch(fetchUser(userId)),
    fetchUserAnswers: (userId) => dispatch(fetchUserAnswers(userId)),
    fetchUserStats: (userId) => dispatch(fetchUserStats(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionIndex);