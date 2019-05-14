import axios from 'axios';

export const fetchFriends = currentUserId => {
  // debugger 
  // return axios.get(`/api/friends/${currentUserId}`)
  return axios.get(`/api/friends/user/${currentUserId}`, currentUserId)
}

export const fetchFriend = friendId => {
  // return axios.get(`/api/friends/${friendId}`)
  return axios.get(`/api/friends/`, friendId)
}

export const addFriend = (data) => {
  debugger 
  return axios.post(`/api/friends/`, data)
}