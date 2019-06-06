import { RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_FRIEND, RECEIVE_FRIENDS, CLEAR_FRIENDS } from '../actions/friend_actions';

// const UsersReducer = (state = {}, action) => {
//   Object.freeze(state);
//   switch (action.type) {
//     case RECEIVE_USER:
//       return { [action.user.id]: action.user }
//     default:
//       return state;
//   }
// }

// MIGHT MAKE FRIENDSREDUCER INSTEAD 

const UsersReducer = (state = { friends: {}, friend: {}, users: {} }, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  // debugger
  switch (action.type) {
    case RECEIVE_USER:
      // debugger
      // newState.friend = action.user.data
      newState.users[action.user.data._id] = action.user.data
      return newState;
    case CLEAR_FRIENDS:
      newState.friends = [];
      return newState;
    case RECEIVE_FRIENDS:
      // debugger 
      newState.friends = action.friends.data;
      return newState;
    case RECEIVE_FRIEND:
      // debugger
      newState.friend = action.friend.data;
      // debugger
      newState.friends.push(action.friend.data);
      return newState;
    default:
      return state;
  }
}

export default UsersReducer;