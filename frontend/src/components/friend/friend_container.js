import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import { fetchUserStats, fetchStats } from '../../actions/stats_actions';

import Friend from './friend';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    users: state.users.users,
    stats: state.stats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: userId => dispatch(fetchUser(userId)),
    fetchUserStats: (userId) => dispatch(fetchUserStats(userId)),
    fetchStats: () => dispatch(fetchStats()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Friend);