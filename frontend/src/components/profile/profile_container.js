import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchUserAnswers } from '../../actions/answer_actions';
import { fetchUserQuestions } from '../../actions/question_actions';
import { fetchUserStats, fetchUserDailyStats } from '../../actions/stats_actions';
import Profile from './profile';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user,
  answers: state.answers,
  questions: state.questions,
  stats: state.stats
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchUserQuestions: (userId) => dispatch(fetchUserQuestions(userId)),
  fetchUserAnswers: (userId) => dispatch(fetchUserAnswers(userId)),
  fetchUserStats: (userId) => dispatch(fetchUserStats(userId)),
  fetchUserDailyStats: (userId) => dispatch(fetchUserDailyStats(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);