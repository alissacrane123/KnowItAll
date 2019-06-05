import axios from 'axios';

export const fetchUser = authorId => {
  return axios.get(`/api/users/${authorId}`)
}

// export const fetchFriends = currentUserId => {
//   return axios.get(`/api/friends/${currentUserId}`)
// }

// export const fetchFriend = friendId => {
//   return axios.get(`/api/friends/${friendId}`)
// }

