import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Friend extends React.Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let { friend, fetchUser, friendObj } = this.props;
    fetchUser(friendObj.friend_id)
  }

  // handleClick(e) {
  //   e.preventDefault();
  //   debugger
  //   this.props.fetchFriend(this.props.friendObj.friend_id)
  // }

  render() {
    let { users, friendObj } = this.props;
    // debugger
    if (Object.keys(users).length === 0 || users[friendObj.friend_id] === undefined ) {
      return null;
    } 
    // debugger
    return (
      <div className="friend-container">

        <div className="friend-link-continer">
          {/* <Link className="friend-link" onClick={this.handleClick} to={'/new'}>
            { users[friendObj.friend_id].username }
          </Link> */}
          <Link className="friend-link"  to={{pathname: '/new', state: {friendId: friendObj.friend_id}}}>
            {users[friendObj.friend_id].username}
          </Link>
        </div>
      
      </div>
    )
  }
}

export default withRouter(Friend);