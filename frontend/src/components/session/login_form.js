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
    this.handleScroll = this.handleScroll.bind(this);
    // this.renderErrors = this.renderErrors.bind(this);
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

    if (e.currentTarget.value != "LOG IN") {
      user = {
        username: 'aubrie',
        password: '123456'
      };
    } 

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
    return (
      <div className="main-body-container">

        {this.renderErrors()}

        <div className="main-title-container">
          <h1 className="main-title">KNOW IT ALL</h1>
        </div>

        <div className="session-form-container">
          <form className="session-form" onSubmit={this.handleSubmit}>
            <div className="session-header-container">
              <div className="header-default">Login</div>
              <Link className="main-link" to={'/signup'}>Sign Up</Link>
            </div>
            <div className="login-inputs">
              <input className="login-input"
                type="text"
                value={this.state.username}
                onChange={this.update('username')}
                placeholder="username"
              />

              <input className="login-input"
                type="password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
              />
              
              <div className="signup-submit">
                <input type="submit" value="LOG IN" className="login-submit" />
                <input type="submit" value="DEMO" className="login-submit" />
              </div>
              <input onClick={this.handleScroll} className="main-button" id="how-it-works" type="button" value="How It Works" />
              <div className="login-line"></div>
            </div>



          </form>
          
          <HowItWorks />
        </div>

        

        <footer>
        </footer>

      </div>


    );
  }
}

export default withRouter(LoginForm);