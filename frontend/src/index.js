import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
import * as APIUtils from './util/answer_api_util';

import './assets/stylesheets/util/reset.css';
import './assets/stylesheets/util/font.css';
import './assets/stylesheets/util/buttons.css';
import './assets/stylesheets/util/errors.css';
import './assets/stylesheets/util/inputs.css';
import './assets/stylesheets/util/colors.css';
import './assets/stylesheets/session.css';
import './assets/stylesheets/navbar.css';
import './assets/stylesheets/question.css';
import './assets/stylesheets/results.css';
import './assets/stylesheets/profile.css';
import './assets/stylesheets/util/layouts.css';

import './assets/shame.css';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  // If a returning user has a session token stored in localStorage
  if (localStorage.jwtToken) {

    // Set the token as a common header for all axios requests
    setAuthToken(localStorage.jwtToken);

    // Decode the token to obtain the user's information
    const decodedUser = jwt_decode(localStorage.jwtToken);

    // Create a preconfigured state we can immediately add to our store
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

    store = configureStore(preloadedState);

    window.store = store;
    window.getState = store.getState;
    window.APIUtils = APIUtils;

    const currentTime = Date.now() / 1000;

    // If the user's token has expired
    if (decodedUser.exp < currentTime) {
      // Logout the user and redirect to the login page
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    // If this is a first time user, start with an empty store
    store = configureStore({});
  }
  // Render our root component and pass in the store as a prop
  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, root);
});