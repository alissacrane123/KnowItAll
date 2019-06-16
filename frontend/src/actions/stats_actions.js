import * as APIUtil from '../util/stats_api_util';

export const RECEIVE_STATS = "RECEIVE_STATS";
export const RECEIVE_USER_STATS = "RECEIVE_USER_STATS";
export const RECEIVE_USER_DAILY_STATS = "RECEIVE_USER_DAILY_STATS";

export const receiveStats = stats => ({
  type: RECEIVE_STATS,
  stats
})

export const receiveUserStats = stats => {
  return ({
    type: RECEIVE_USER_STATS,
    stats
  })
}

export const receiveUserDailyStats = stats => {
  return ({
    type: RECEIVE_USER_DAILY_STATS,
    stats
  })
}

export const fetchStats = () => dispatch => (
  APIUtil.fetchStats()
    .then(stats => dispatch(receiveStats(stats)))
    .catch(err => console.log(err))
);

export const fetchUserStats = id => dispatch => {
  return APIUtil.fetchUserStats(id)
    .then(stats => dispatch(receiveUserStats(stats)))
    .catch(err => console.log(err))
};

export const fetchUserDailyStats = id => dispatch => {
  return APIUtil.fetchUserDailyStats(id)
    .then(stats => dispatch(receiveUserDailyStats(stats)))
    .catch(err => console.log(err))
};