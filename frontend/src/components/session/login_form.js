import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HowItWorks from '../how-it-works/how_it_works';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoSubmit = this.handleDemoSubmit.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/questions');
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.login(user);
  }

  handleDemoSubmit(e) {
    e.preventDefault();

    let user = {
        username: 'aubrie',
        password: '123456'
    };
    
    this.props.login(user);
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
        <div className="session-form-container">
          <form className="session-form" onSubmit={this.handleSubmit}>
            <div className="session-header-container">
              <div className="header-default">Login</div>
              <Link className="main-link" to={'/signup'}>Sign Up</Link>
            </div>
            <div className="session-inputs">
              {usernameError}
              <input className="general-input"
                type="text"
                value={this.state.username}
                onChange={this.update('username')}
                placeholder="username"
              />
              {passwordError}
              <input className="general-input"
                type="password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
              />
              <div className="signup-submit">
                <input type="submit" value="LOG IN" className="login-submit" />
                <button className="login-submit" onClick={this.handleDemoSubmit}>DEMO</button>
              </div>
              <input onClick={this.handleScroll} className="main-button" id="how-it-works" type="button" value="How It Works" />
            </div>
          </form>
          <HowItWorks />
        </div>
       
      </div>
    );
  }
}

export default withRouter(LoginForm);