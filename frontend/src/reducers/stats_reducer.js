import { RECEIVE_STATS, RECEIVE_USER_STATS, RECEIVE_USER_DAILY_STATS } from '../actions/stats_actions';

const StatsReducer = (state = { all: {}, user: {}, userDaily: {} }, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_STATS:
      newState.all = action.stats.data;
      return newState;
    case RECEIVE_USER_STATS:
      newState.user = action.stats.data;
      return newState;
    case RECEIVE_USER_DAILY_STATS:
      newState.userDaily = action.stats.data;
      return newState;
    default:
      return state;
  }
}

export default StatsReducer;