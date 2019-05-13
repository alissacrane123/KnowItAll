
import { combineReducers } from 'redux';
import session from './session_api_reducer';
import errors from './errors_reducer';
import questions from './questions_reducer';

const RootReducer = combineReducers({
  session, 
  errors,
  questions

});

export default RootReducer;