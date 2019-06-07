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

  componentDidMount() {
    let { fetchUserStats, fetchStats, currentUser } = this.props;
    fetchStats();
    fetchUserStats(currentUser.id);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.clearFriends();
    this.props.history.push('/login')
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="navbar-buttons-container">
          <Link className="nav-link" to={'/howitworks'}><button className="nav-button" >HOW IT WORKS</button></Link>
          {/* <Link className="nav-link" to={'/new'}><button className="nav-button" >Challenge</button></Link> */}
          <Link className="nav-link" to={'/questions'}><button className="nav-button" >FEED</button></Link>
          <Link className="nav-link" to={'/profile'}><button className="nav-button" >PROFILE</button></Link>
          {/* <Link to={'/stats'}><button className="nav-button" >Stats</button></Link> */}
          <div className="nav-link"><button className="nav-button" onClick={this.logoutUser}>LOGOUT</button></div>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={'/signup'}>SIGNUP</Link>
          <Link to={'/login'}>LOGIN</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="nc2">
      <div className="navbar-container">
        <div className="navbar-header-container">
            <Link to={'/'}>
            <img className="logo-img" src="https://66.media.tumblr.com/c3713205799d45db82b3c7de42053888/tumblr_prk4e73csi1wyb2l8o1_640.png" alt="block letters KnowItAll"></img>
            </Link>
        </div>

        <div className="navbar-links-container">
          {this.getLinks()}
        </div>
      </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
