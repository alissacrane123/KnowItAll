import axios from 'axios';

export const fetchUser = authorId => {
  return axios.get(`/api/users/${authorId}`)
}
