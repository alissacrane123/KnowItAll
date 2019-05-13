import axios from 'axios';

export const createQuestion = (data) => {
    return axios.post('/api/questions', data);
};

export const fetchQuestions = () => {
    return axios.get('/api/questions');
};