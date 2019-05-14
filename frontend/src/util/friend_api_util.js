import axios from 'axios';

export const fetchFriends = currentUserId => {
  // debugger 
  // return axios.get(`/api/friends/${currentUserId}`)
  return axios.get(`/api/friends/${currentUserId}`, currentUserId)
}

export const fetchFriend = friendId => {
  // return axios.get(`/api/friends/${friendId}`)
  return axios.get(`/api/friends/`, friendId)
}

export const addFriend = (data) => {
  return axios.post(`/api/friends/`, data)
}