import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) { // componentDidUpdate

    if (nextProps.currentUser === true) {
      this.props.history.push('/questions');
    }

    // this.setState({ errors: nextProps.errors })
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

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="main-body-container">

        <div className="main-title-container">
          <h1>Know It All</h1>
        </div>

        <div className="session-form-container">
          <form className="session-form" onSubmit={this.handleSubmit}>
            <div className="session-header-container">
              <div>Login Below!</div>
            </div>
            <div className="login-inputs">
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                placeholder="username"
              />
              <br />
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
              />
              <br />
              <input type="submit" value="Submit" />
              {this.renderErrors()}
            </div>

            <div className="switch-session">
              <Link className="main-link" to={'/signup'}>Signup instead</Link>
            </div>
          </form>
        </div>


        <footer>
        </footer>

      </div>


    );
  }
}

export default withRouter(LoginForm);