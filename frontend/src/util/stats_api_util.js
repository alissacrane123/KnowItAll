import axios from 'axios';

export const fetchStats = () => {
  return axios.get('/api/answers/stats')
};

export const fetchUserStats = id => {
  return axios.get(`api/answers/stats/user/${id}`)
};