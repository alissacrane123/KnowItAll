import axios from 'axios';

export const fetchAnswers = () => {
  return axios.get('/api/answers')
};

export const createAnswer = data => {
  // debugger
  return axios.post('/api/answers/', data)
};

export const fetchQuestionAnswers = id => {
  return axios.get(`api/answers/question/${id}`)
};

