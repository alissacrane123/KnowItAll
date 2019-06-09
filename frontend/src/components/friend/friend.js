import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.handleStorage = this.handleStorage.bind(this);
  }

  componentDidMount() {
    let { fetchUser, friendObj, fetchUserStats, fetchStats} = this.props;
    fetchStats();
    fetchUser(friendObj.friend_id);
    fetchUserStats(friendObj.friend_id);
  }

  handleStorage(friendAvatar, friend, friendId) {
    localStorage.setItem("friendAvatar", friendAvatar);
    localStorage.setItem("friend", friend);
    localStorage.setItem("friendId", friendId);
  }

  assignAvatar(score) {
    if (score > 75) {
      return "https://66.media.tumblr.com/a263296449a822e94dbd85e43daf2fce/tumblr_pspc1jZDky1wyb2l8o1_540.png"
    } else if (score > 50) {
      return "https://66.media.tumblr.com/b95a7055813bc8448637d9007674d5b4/tumblr_psqresCYwa1wyb2l8o3_540.png"
    } else if (score > 25) {
      return "https://66.media.tumblr.com/1c0def0a05d9e2dcfa8804026261780f/tumblr_psqresCYwa1wyb2l8o1_540.png"
    } else {
      return "https://66.media.tumblr.com/4ed22aa527fd985650829a9919100917/tumblr_psqresCYwa1wyb2l8o2_540.png"
    }
  }

  render() {
    let { users, friendObj, currentUser } = this.props;
    let friendAvatar, score;
    
    // check if there are any users && friend loaded or if friendObj is self then
    // start conditional rendering of score & avatar
    if (Object.keys(users).length === 0 ||
          users[friendObj.friend_id] === undefined || friendObj.friend_id === currentUser.id ) {
      return null;
    }
    
    this.friend_stats = this.props.stats.all.filter(el => el._id === friendObj.friend_id)[0];

    if (!this.props.stats.all[0]) {
      score = 0;
    } else {
      if (this.friend_stats !== undefined) {
        score = this.friend_stats.AvgPercent
      }
    }
    
    let friend = users[friendObj.friend_id].username;
    let friendId = friendObj.friend_id;

    if (!this.props.stats.all[0]) {
      return null;
    } else {
      friendAvatar = this.assignAvatar(score)      
    }

    return (
      <div className="hover-bigger">
        <div className="container-list-item-md">
          <Link className="container-col-1" to={{ pathname: '/new', state: {test: "test"}}} onClick={() => this.handleStorage(friendAvatar, friend, friendId)}>
              <ul className="container-list-row-center">
                <li><img src={friendAvatar} height="70"></img></li>
                <li>{friend}</li>
                <li>{score || "0"}%<p className="centered-text">correct</p></li>
              </ul>
          </Link>
        </div>
    </div>
    )
  }
}

export default withRouter(Friend);