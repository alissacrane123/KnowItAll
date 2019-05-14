
import * as APIUtil from '../util/user_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_USER = "RECEIVE_USER";

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})

export const fetchUser = authorId => dispatch => (
  APIUtil.fetchUser(authorId).then(user => dispatch(receiveUser(user)))
);