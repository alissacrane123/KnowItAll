import React from 'react';
import { Link } from 'react-router-dom'

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="main-links">
          <Link className="main-link" to={'/new'}><button className="main-button" >New Question</button></Link>
          <Link className="main-link" to={'/profile'}><button className="main-button" >Profile</button></Link>
          <Link className="main-link" to={'/stats'}>Stats</Link>
          <button className="main-link" onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="main-links">
          <Link className="main-link" to={'/signup'}><button className="main-button" >Signup</button></Link>
          <Link className="main-link" to={'/login'}><button className="main-button" >Login</button></Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="main-body-container">

        <div className="main-title-container">
          <h1>Know It All</h1>
        </div>

        <div className="main-links-container">
          {this.getLinks()}
        </div>
          
        <footer>
        </footer>

      </div>
    );
  }
}

export default MainPage;