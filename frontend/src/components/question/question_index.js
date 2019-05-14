import React from 'react';
import { Link } from 'react-router-dom';
import Friend from '../friend/friend';
import CreateFriend from '../friend/create_friend';

class QuestionIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = { questions: [],  }
  }


  componentDidMount() {
    let { fetchQuestions, fetchFriends, currentUser } = this.props
    fetchQuestions();
    fetchFriends(currentUser.id);
    // this.setState({questions: this.props.questions })
    // debugger
  }


  // componentDidUpdate() {

  // }


  render() {
    let { addFriend, currentUser, fetchUser, friend } = this.props;

    let questions;

    if (!this.props.questions) {
      return null;
    } else {
      questions = this.props.questions.map(question => (
        <div key={question.id} className="question-item-container">
          <div key={question.id} className="question-body">
            {question.body}
          </div>
        </div>
      ));
    }
    
    let friends;

    if (this.props.friends[0] === undefined) {
      // debugger
      friends = [];
    } else {
      // debugger
      friends = this.props.friends.map(friendObj => (
        <Friend friendObj={friendObj} fetchUser={fetchUser} friend={friend}/>
      ))
    }
    

    return (
      <div className="index-body-container">

        <div className="index-friends-container">
          <div className="friends-header-container">
            <div className="friends-header">Select a friend to challenge:</div>
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
            <div className="index-header">
              Recently Asked Questions Listed Below:
            </div>
          </div>

          <div className="questions-container">
            {questions}
          </div>
        </div>


        {/* <CreateFriend addFriend={addFriend} currentUser={currentUser}/> */}
        {/* <div className="add-friend-container">
          <div className="add-friend-header-container">
            <div className="add-friend-header">
              To add a new friend, enter their username below:
            </div>
          </div>
          <div className="username-input-container">
            <input className="username-input" type="text" value="" />
          </div>
        </div> */}

      </div>
    )
  }
}

export default QuestionIndex;