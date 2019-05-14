
import { combineReducers } from 'redux';
import session from './session_api_reducer';
import errors from './errors_reducer';
import questions from './questions_reducer';
import users from './user_reducer';
import answers from './answer_reducer';
import results from './results_reducer';

const RootReducer = combineReducers({
  session, 
  errors,
  questions,
  users,
  answers,
  results

});

export default RootReducer;