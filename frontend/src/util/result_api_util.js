import axios from 'axios';

export const getResults = (urlData) => {
  return axios.get('/api/search', urlData);
};