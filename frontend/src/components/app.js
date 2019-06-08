import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './navbar/navbar_container';

import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import QuestionComposeContainer from './question/question_compose_container';
import QuestionIndexContainer from './question/question_index_container';
import ProfileContainer from './profile/profile_container';
import HowItWorks from './how-it-works/how_it_works';

const App = () => (
  <div className="main-div">
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <AuthRoute exact path="/" component={LoginFormContainer} />
      <NavBarContainer />
    </Switch>

    <Switch>
      <ProtectedRoute exact path="/questions" component={QuestionIndexContainer} />
      <ProtectedRoute exact path="/new" component={QuestionComposeContainer} />
      <ProtectedRoute exact path="/profile" component={ProfileContainer} />
      <ProtectedRoute exact path='/howitworks' component={HowItWorks} />
    </Switch>
  </div>
);

export default App;
