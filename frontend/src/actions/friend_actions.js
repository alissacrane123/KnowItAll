
import * as APIUtil from '../util/friend_api_util';

export const RECEIVE_FRIENDS = "RECEIVE_FRIENDS";
export const RECEIVE_FRIEND = "RECEIVE_FRIEND";

// export const RECEIVE_NEW_FRIEND = "RECEIVE_NEW_FRIEND"; // UNSURE

// export const receiveNewFriend = data => ({ // UNSURE
//   type: RECEIVE_NEW_FRIEND,
//   data
// })

export const receiveFriends = friends => ({
  type: RECEIVE_FRIENDS,
  friends
})

export const receiveFriend = friend => ({
  type: RECEIVE_FRIEND,
  friend
})

export const addFriend = data => dispatch => (
  APIUtil.addFriend(data)
    .then(friend => dispatch(receiveFriend(friend)))
    .catch(err => console.log(err))
)

export const fetchFriends = currentUserId => dispatch => (
  APIUtil.fetchFriends(currentUserId)
    .then(friends => dispatch(receiveFriends(friends)))
    .catch(err => console.log(err))
)

export const fetchFriend = friendId => dispatch => (
  APIUtil.fetchFriend(friendId)
    .then(friend => dispatch(receiveFriend(friend)))
    .catch(err => console.log(err))
)

