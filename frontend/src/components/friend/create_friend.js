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
    let { currentUser, addFriend } = this.props;
    let friend = { friendName: this.state.username, userId: this.state.userId}
    let other;
    // if(this.state.username === ""){return;}
    addFriend(friend)
      .then(
        newFriend => {
          if (newFriend !== undefined && newFriend.type !== "RECEIVE_FRIEND_ERRORS") {
            other = { friendName: currentUser.username, 
                      userId: newFriend.friend.data.friend_id };
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

    let friendError;
    if ((this.props.errors !== undefined && this.props.errors.friend !== undefined)) {
      friendError = <span className="error" style={{color: "red"}} >{this.props.errors.friend}</span>;
    }


    return (
      <form onSubmit={this.handleSubmit}>
        <h4>
          To <strong>Add</strong> a new friend, enter their username below:
        </h4>
        <div className="container-2-3-col">
          {friendError}
          <div className="sub-container-list-col-start">
            <input className="general-input-grey"
                    type="text" 
                    value={this.state.username}
                    onChange={this.update()} />
            <input type="submit" value="Submit" className="general-button"/>
          </div>
        </div>
      </form>
    )
  }
}

export default CreateFriend;