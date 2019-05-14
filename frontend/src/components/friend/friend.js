import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let { friend, fetchUser, friendObj } = this.props;
    fetchUser(friendObj.friend_id)
  }

  handleClick(e) {
    e.preventDefault();
    this.props.fetchFriend(this.props.friend.id)
  }

  render() {
    let { friend } = this.props;
    debugger
    if (Object.keys(friend).length === 0) {
      return null;
    } 
    debugger
    return (
      <div className="friend-container">

        <div className="friend-link-continer">
          <Link className="friend-link" onClick={this.handleClick} to={'/new'}>
            { friend.username }
          </Link>
        </div>
      
      </div>
    )
  }
}

export default withRouter(Friend);