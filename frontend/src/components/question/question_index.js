import React from 'react';
import FriendContainer from '../friend/friend_container';
import CreateFriend from '../friend/create_friend';

class QuestionIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = { questions: [] }
  }

  componentDidMount() {
    let { fetchQuestions, fetchFriends, currentUser } = this.props
    fetchQuestions();
    fetchFriends(currentUser.id);
  }

  render() {
    let { addFriend, currentUser } = this.props;
    
    let questions;
    if (!this.props.questions) {
      return null;
    } else {
      questions = this.props.questions.map((question, idx) => (
        <div key={idx} className="question-item-container">
          <div key={idx} className="question-body">
            {question.body}
          </div>
        </div>
      ));
    }
    
    let friends;
    if (this.props.friends[0] === undefined) {
      friends = [];
    } else {
      friends = this.props.friends.map((friendObj, idx) => (
        <FriendContainer key={idx} friendObj={friendObj}/>
      ))
    }

    return (
      <div className="index-body-container">
        <div className="index-friends-container">
          <div className="friends-header-container">
            <h2 className="friends-header">CHALLENGE A FRIEND:</h2>
          </div>
          <div className="friends-container">
            { friends }
          </div> 
          <div className="new-friend-container">
            <CreateFriend addFriend={addFriend} currentUser={currentUser} />
          </div>
        </div>
        <div className="index-questions-container">
          <div className="index-header-container" >
            <h3 className="index-header">
              Question Feed:
            </h3>
          </div>
          <div className="questions-container">
            {questions}
          </div>
        </div>
      </div>
    )
  }
}

export default QuestionIndex;