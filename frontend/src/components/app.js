import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './navbar/navbar_container';
import { Route } from 'react-router-dom';

import MainPageContainer from './main/main_page_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import QuestionComposeContainer from './question/question_compose_container';
import QuestionIndexContainer from './question/question_index_container';
import ProfileContainer from './profile/profile_container';

const App = () => (
  <div className="main-div">
    <Switch>
      <AuthRoute exact path="/" component={MainPageContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <NavBarContainer />
    </Switch>

    <Switch>
      <ProtectedRoute exact path="/questions" component={QuestionIndexContainer} />
      <ProtectedRoute exact path="/new" component={QuestionComposeContainer} />
      <ProtectedRoute exact path="/profile" component={ProfileContainer} />
    </Switch>
  </div>
);

export default App;