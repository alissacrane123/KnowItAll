import React from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
// import './navbar.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/login')
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="navbar-buttons-container">
          <Link className="nav-link" to={'/new'}><button className="nav-button" >New Question</button></Link>
          <Link className="nav-link" to={'/questions'}><button className="nav-button" >All Questions</button></Link>
          <Link className="nav-link" to={'/profile'}><button className="nav-button" >Profile</button></Link>
          {/* <Link to={'/stats'}><button className="nav-button" >Stats</button></Link> */}
          <div className="nav-link"><button className="nav-button" onClick={this.logoutUser}>Logout</button></div>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="navbar-container">
        <div className="navbar-header-container">
          <div>LOGO</div>
        </div>

        <div className="navbar-links-container">
          {this.getLinks()}
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
