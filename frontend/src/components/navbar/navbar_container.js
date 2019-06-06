import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchStats, fetchUserStats } from '../../actions/stats_actions';
import { clearFriends } from '../../actions/friend_actions';

import NavBar from './navbar';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    fetchStats: () => dispatch(fetchStats()),
    fetchUserStats: (userId) => dispatch(fetchUserStats(userId)),
    clearFriends: () => dispatch(clearFriends())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);