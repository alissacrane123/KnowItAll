

import {
    RECEIVE_FRIEND_ERRORS,
    RECEIVE_FRIEND,
    RECEIVE_FRIENDS
} from '../actions/friend_actions';

const _nullErrors = [];

const FriendsErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_FRIEND_ERRORS:
            return action.errors;
        case RECEIVE_FRIEND:
            return _nullErrors;
        case RECEIVE_FRIENDS:
            return _nullErrors;
        default:
            return state;
    }
};

export default FriendsErrorsReducer;