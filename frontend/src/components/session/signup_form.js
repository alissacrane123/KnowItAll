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
    return (
      <div className="main-body-container">
        {this.renderErrors()}
        <div className="main-title-container">
          <h1 className="main-title">KNOW IT ALL</h1>
        </div>

        <div className="signup-form-container">
          <form className="signup-form" onSubmit={this.handleSubmit}>

            <div className="session-header-container">
              <div className="header-default">Sign Up</div>
              <Link className="main-link" to={'/login'}>Login</Link>
            </div>

            {/* <div className="signup-inputs-container"> */}
            <div className="signup-inputs">
              {/* <div className="signup-input"> */}
              <input className="signup-input" type="text"
                  value={this.state.email}
                  onChange={this.update('email')}
                  placeholder="Email"
                />
              
              {/* <div className="signup-input"> */}
              <input className="signup-input" type="text"
                  value={this.state.username}
                  onChange={this.update('username')}
                  placeholder="username"
                />
              {/* </div> */}
              {/* <div className="signup-input"> */}
              <input className="signup-input" 
                  type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                  placeholder="Password"
                />
              {/* </div> */}
              {/* <div className="signup-input"> */}
              <input className="signup-input"
                  type="password"
                  value={this.state.password2}
                  onChange={this.update('password2')}
                  placeholder="Confirm Password"
                />
              {/* </div> */}

            </div>
            <div className="signup-submit">
              <input className="login-submit"
                type="submit" value="Submit" />
            </div>
            <input onClick={this.handleScroll} className="main-button" type="button" value="How It Works"/>
            {/* <div className="main-line"></div> */}
            {/* {this.renderErrors()} */}
          </form>
          {/* {this.renderErrors()} */}
          <HowItWorks />
        </div>
        <footer>
        </footer>

      </div>


    );
  }
}

export default withRouter(SignupForm); 