import axios from 'axios';


export const getQuestions = () => {
  return axios.get('/api/questions')
};

export const getUserQuestions = id => {
  return axios.get(`/api/questions/user/${id}`)
};

export const poseQuestion = data => {
  // debugger
  return axios.post('/api/questions/', data)
}

