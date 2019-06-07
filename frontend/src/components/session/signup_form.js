import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
    this.handleScroll = this.handleScroll.bind(this);
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

  handleScroll() {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: 700
    });
  }

  renderErrors() {
    return (
      <ul className="errors-container">
        {Object.keys(this.state.errors).map((error, i) => (
          <li className="errors" key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
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
      <div className="main-body-container">
        <div className="main-title-container">
          <h1 className="main-title">KnowItAll</h1>
        </div>
        <div className="signup-form-container">
          <form className="signup-form" onSubmit={this.handleSubmit}>
            <div className="session-header-container">
              <Link className="main-link" to={'/login'}>Login</Link>
              <div className="header-default">Sign Up</div>
            </div>
            {emailError}
            <div className="signup-inputs">
              <input className="signup-input" type="text"
                  value={this.state.email}
                  onChange={this.update('email')}
                  placeholder="Email"
                />
              {usernameError}
              <input className="signup-input" type="text"
                  value={this.state.username}
                  onChange={this.update('username')}
                  placeholder="username"
                />
              {passwordError}
              <input className="signup-input" 
                  type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                  placeholder="Password"
                />
              <input className="signup-input"
                  type="password"
                  value={this.state.password2}
                  onChange={this.update('password2')}
                  placeholder="Confirm Password"
                />
            </div>
            <div className="signup-submit">
              <input className="login-submit"
                type="submit" value="Submit" />
            </div>
            <input onClick={this.handleScroll} className="main-button" type="button" value="How It Works"/>
          </form>
        </div>
        <HowItWorks />
      </div>
    );
  }
}

export default withRouter(SignupForm); 