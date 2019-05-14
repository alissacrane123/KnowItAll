import { connect } from 'react-redux';
import { fetchQuestions } from '../../actions/question_actions';
import { fetchFriends, fetchFriend, addFriend } from '../../actions/friend_actions';
import { fetchUser } from '../../actions/user_actions';

import QuestionIndex from './question_index';

const mapStateToProps = (state) => {
  // debugger
  return {
    currentUser: state.session.user,
    questions: Object.values(state.questions.all),
    // friends: Object.values(state.users.friends),
    friends: state.users.friends,
    friend: state.users.friend,
    newFriend: state.users.friend
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchQuestions: () => dispatch(fetchQuestions()),
    fetchFriends: (currentUserId) => dispatch(fetchFriends(currentUserId)),
    fetchFriend: (friendId) => dispatch(fetchFriend(friendId)),
    addFriend: (data) => dispatch(addFriend(data)),
    fetchUser: userId => dispatch(fetchUser(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionIndex);