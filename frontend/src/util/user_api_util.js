import axios from 'axios';

export const fetchUser = authorId => {
  return axios.get(`/api/users/${authorId}`)
}

export const fetchUserByUsername = username => {
  return axios.get(`/api/users/username/${username}`)
}

// export const fetchFriends = currentUserId => {
//   return axios.get(`/api/friends/${currentUserId}`)
// }

// export const fetchFriend = friendId => {
//   return axios.get(`/api/friends/${friendId}`)
// }

