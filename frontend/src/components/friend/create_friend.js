import React from 'react';

class CreateFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', userId: this.props.currentUser.id }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    let { currentUser, addFriend } = this.props
    let friend = { friendName: this.state.username, userId: this.state.userId}
    let other;

    addFriend(friend)
      .then(
        newFriend => {
          if (newFriend !== undefined) {
            other = { friendName: currentUser.username, 
                      userId: newFriend.friend.data.friend_id }
            addFriend(other);
          }
        }
      );
  }


  update() {
    return e => this.setState({
      username: e.currentTarget.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="add-friend-form">
        <div className="add-friend-header-container">
          <div className="add-friend-header">
            To <strong>Add</strong> a new friend, enter their username below:
            </div>
        </div>
        <div className="username-input-container">
          <input className="username-input" 
                  type="text" 
                  value={this.state.username}
                  onChange={this.update()} />
        </div>

        <div className="new-friend-submit-container">
          <input type="submit" value="Submit" />
        </div>
      </form>
    )
  }
}

export default CreateFriend;