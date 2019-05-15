import { RECEIVE_ANSWER, RECEIVE_ANSWERS, RECEIVE_QUESTION_ANSWERS, RECEIVE_USER_ANSWERS } from '../actions/answer_actions';
import { RECEIVE_NEW_QUESTION } from '../actions/question_actions';

const AnswerReducer = (state = { all: {}, question: {}, new: undefined }, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  // debugger
  switch (action.type) {
    case RECEIVE_ANSWERS:
      newState.all = action.answers.data;
      return newState;
    case RECEIVE_QUESTION_ANSWERS:
      newState.question = action.questions.data;
      return newState;
    case RECEIVE_USER_ANSWERS:
      newState.all = action.answers.data;
      return newState;
    case RECEIVE_NEW_QUESTION:
      newState.new = action.question.data;
      return newState;
    case RECEIVE_ANSWER:
      // debugger 
      newState.new = action.answer.data;
      return newState;
    default: 
      return state;
  }
}

export default AnswerReducer;