
import * as APIUtil from '../util/user_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_USER = "RECEIVE_USER";
// export const RECEIVE_FRIENDS = "RECEIVE_FRIENDS";
// export const RECEIVE_FRIEND = "RECEIVE_FRIEND"

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})

// export const receiveFriends = friends => ({
//   type: RECEIVE_FRIENDS,
//   friends
// })

// export const receiveFriend = friend => ({
//   type: RECEIVE_FRIEND,
//   friend
// })

export const fetchUser = userId => dispatch => (
  APIUtil.fetchUser(userId)
    .then(user => dispatch(receiveUser(user)))
    .catch(err => console.log(err))
);

// export const fetchFriends = currentUserId => dispatch => (
//   APIUtil.fetchFriends(currentUserId)
//     .then(friends => dispatch(receiveFriends(friends)))
//     .catch(err => console.log(err))
// )

// export const fetchFriend = friendId => dispatch => (
//   APIUtil.fetchFriend(friendId)
//     .then(friend => dispatch(receiveFriend(friend)))
//     .catch(err => console.log(err))
// )