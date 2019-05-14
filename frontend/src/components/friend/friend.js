import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.fetchFriend(this.props.friend.id)
  }

  render() {
    let { friend } = this.props;

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