import React from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
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

  render() {
    return (
      <div className="container-col-1">
      <div className="navbar-container">
          <div className="container-list-row-l-r">
              <Link to={'/'}>
                <img className="navbar-logo-img" height="60px" src="https://66.media.tumblr.com/c3713205799d45db82b3c7de42053888/tumblr_prk4e73csi1wyb2l8o1_640.png" alt="block letters KnowItAll"></img>
              </Link>
              <div className="container-list-row-end">
                <Link to={'/howitworks'}><button className="navbar-button" ><h2>HOW IT WORKS</h2></button></Link>
                <Link to={'/questions'}><button className="navbar-button" ><h2>FEED</h2></button></Link>
                <Link to={'/profile'}><button className="navbar-button" ><h2>PROFILE</h2></button></Link>
                <a><button className="navbar-button" onClick={this.logoutUser}><h2>LOGOUT</h2></button></a>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
