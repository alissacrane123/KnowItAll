
import { combineReducers } from 'redux';
import session from './session_api_reducer';
import errors from './errors_reducer';
import questions from './questions_reducer';
import user from './user_reducer';
import answers from './answer_reducer';

const RootReducer = combineReducers({
  session, 
  errors,
  questions,
  user,
  answers

});

export default RootReducer;