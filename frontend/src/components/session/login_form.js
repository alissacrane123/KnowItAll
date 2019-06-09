import React from 'react';
import { withRouter } from 'react-router-dom';
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
      <div className="session-img-container">
        <div className="index-body-container">
          <div className="container-2-3-col">
            <form className="container-list-col-center" onSubmit={this.handleSubmit}>
              <div className="container-list-item-xl">
                <div className="container-list-col-center">
                  {usernameError}
                  <input className="session-input"
                    type="text"
                    value={this.state.username}
                    onChange={this.update('username')}
                    placeholder="username"
                  />
                  {passwordError}
                  <input className="session-input"
                    type="password"
                    value={this.state.password}
                    onChange={this.update('password')}
                    placeholder="Password"
                  />
                  <input type="submit" value="LOG IN" className="general-button" />
                  <button className="general-button" onClick={this.handleDemoSubmit}>DEMO</button>
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

export default withRouter(LoginForm);