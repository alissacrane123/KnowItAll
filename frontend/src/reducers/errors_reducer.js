import { combineReducers } from 'redux';

import SessionErrorsReducer from './session_errors_reducer';
import FriendsErrorsReducer from './friend_errors_reducer';

export default combineReducers({
  session: SessionErrorsReducer,
  friend: FriendsErrorsReducer
});