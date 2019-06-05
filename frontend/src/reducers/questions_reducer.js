import { RECEIVE_QUESTIONS, RECEIVE_USER_QUESTIONS, RECEIVE_NEW_QUESTION } from '../actions/question_actions';

const QuestionsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  // debugger
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      newState.all = action.questions.data;
      return newState;
    case RECEIVE_USER_QUESTIONS:
      newState.user = action.questions.data;
      return newState;
    case RECEIVE_NEW_QUESTION:
      newState.new = action.question.data
      return newState;
    default:
      return state;
  }
};

export default QuestionsReducer;