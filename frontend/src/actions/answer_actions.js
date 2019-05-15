import * as APIUtil from '../util/answer_api_util';

export const RECEIVE_ANSWER = "RECEIVE_ANSWER";
export const RECEIVE_ANSWERS = "RECEIVE_ANSWERS";
export const RECEIVE_QUESTION_ANSWERS = "RECEIVE_QUESTION_ANSWERS";
export const RECEIVE_USER_ANSWERS = "RECEIVE_USER_ANSWERS";

export const receiveAnswers = answers => ({
  type: RECEIVE_ANSWERS,
  answers
})

export const receiveQuestionAnswers = answers => ({
  type: RECEIVE_QUESTION_ANSWERS,
  answers 
})

export const receiveUserAnswers = answers => {
  return ({
  type: RECEIVE_USER_ANSWERS,
  answers
})
}

export const receiveAnswer = answer => ({
  type: RECEIVE_ANSWER,
  answer 
})

export const fetchAnswers = () => dispatch => (
  APIUtil.fetchAnswers()
    .then(answers => dispatch(receiveAnswers(answers)))
    .catch(err => console.log(err))
);

export const fetchQuestionAnswers = id => dispatch => (
  APIUtil.fetchQuestionAnswers(id)
    .then(answers => receiveQuestionAnswers(answers))
    .catch(err => console.log(err))
);

export const fetchUserAnswers = id => dispatch => {
  return APIUtil.fetchUserAnswers(id)
    .then(answers => dispatch(receiveUserAnswers(answers)))
    .catch(err => console.log(err))
};

export const createAnswer = answer => dispatch => (
  APIUtil.createAnswer(answer)
    .then(answer => dispatch(receiveAnswer(answer)))
    .catch(err => console.log(err))
);

