import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchUserAnswers } from '../../actions/answer_actions';
import Profile from './profile';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user,
  answers: state.answers
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  // fetchUserQuestions: (userId) => dispatch(fetchUserQuestions(userId)),
  fetchUserAnswers: (userId) => dispatch(fetchUserAnswers(userId))
  // fetchQuestionComments:
  // fetchCommentUsers:
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);