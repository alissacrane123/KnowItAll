import React from 'react';
import { Link } from 'react-router-dom'
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
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="navbar-links-container">
          <Link className="navbar-link" to={'/new'}>New Question</Link>
          <Link className="navbar-link" to={'/profile'}>Profile</Link>
          <Link className="navbar-link" to={'/stats'}>Stats</Link>
          <button className="navbar-link" onClick={this.logoutUser}>Logout</button>
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
      <div className="main">
        <div className="navbar-header-container">
          <h1>Know It All</h1>
        </div>

        <div className="navbar-container">
          {this.getLinks()}
        </div>
      </div>
    );
  }
}

export default NavBar;
