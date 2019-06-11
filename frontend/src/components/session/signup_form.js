import React from 'react';
import { withRouter } from 'react-router-dom';
import HowItWorks from '../how-it-works/how_it_works';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      errors: {} 
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/login');
    }

    this.setState({ errors: nextProps.errors })
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history);
  }

  render() {
    let emailError;
    if ((this.props.errors !== undefined && this.props.errors.email !== undefined)) {
      emailError = <p className="error">{this.props.errors.email}</p>;
    }

    let usernameError;
    if ((this.props.errors !== undefined && this.props.errors.username !== undefined)) {
      usernameError = <p className="error">{this.props.errors.username}</p>;
    }

    let passwordError;
    if ((this.props.errors !== undefined && this.props.errors.password !== undefined)) {
      passwordError = <p className="error">{this.props.errors.password}</p>;
    }

    return (
      <div className="session-img-container">
        <div className="index-body-container">
          <div className="container-2-3-col">
            <form className="container-list-col-center" onSubmit={this.handleSubmit}>
              <div className="container-list-item-xl">
                <div className="container-list-col-center">
                  {emailError}
                  <input className="session-input" type="text"
                      value={this.state.email}
                      onChange={this.update('email')}
                      placeholder="Email"
                  />
                  {usernameError}
                  <input className="session-input" type="text"
                      value={this.state.username}
                      onChange={this.update('username')}
                      placeholder="username"
                  />
                  {passwordError}
                  <input className="session-input" 
                      type="password"
                      value={this.state.password}
                      onChange={this.update('password')}
                      placeholder="password"
                  />
                  <input className="session-input"
                      type="password"
                      value={this.state.password2}
                      onChange={this.update('password2')}
                      placeholder="Confirm Password"
                  />
                  <input className="general-button" type="submit" value="Signup" />
                </div>
              </div>
            </form>
          </div>
        </div>
        <HowItWorks />
      </div>
    );
  }
}

export default withRouter(SignupForm); 