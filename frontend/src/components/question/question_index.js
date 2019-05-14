import React from 'react';
import { Link } from 'react-router-dom';
import Friend from '../friend/friend';

class QuestionIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = { questions: [] }
  }


  componentDidMount() {
    this.props.fetchQuestions();
    // this.setState({questions: this.props.questions })
    // debugger
  }


  // componentDidUpdate() {

  // }


  render() {
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

    if (!this.props.friends) {
      return null;
    } else {
      friends = this.props.friends.map(friend => (
        <Friend friend={friend} fetchFriend={this.props.fetchFriend}/>
      ))
    }
    

    return (
      <div className="index-body-container">

        <div className="index-friends-container">
          <div className="friends-header-container">
            <div className="friends-header">Select a friend to challenge:</div>
          </div>
          <div className="friends-container">
            {/* { friends }      */}
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

      </div>
    )
  }
}

export default QuestionIndex;