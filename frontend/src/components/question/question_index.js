import React from 'react';
import FriendContainer from '../friend/friend_container';
import CreateFriend from '../friend/create_friend';
import { fetchAnswers } from '../../actions/answer_actions';

class QuestionIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      stats: {},
      showans: null,
    }
  }

  componentDidMount() {

    let { fetchQuestions, fetchFriends, currentUser, fetchStats, fetchAnswers } = this.props

    fetchQuestions();
    fetchAnswers();
    fetchFriends(currentUser.id);
    fetchStats();
  }
  
  showans(id){
    if(this.state.showans ===id){
      this.setState({showans: null});
    }else{
    this.setState({showans: id});
    }
  }

  render() {
    let { addFriend, currentUser } = this.props;
    let answers = this.props.answers.all;
    let style = (answer) =>{
      if(answer.winner){
        return({color: "green"});
      }else{
        return({color: "red"});
      }

    };
    let ans = (id) =>{
      let anses = answers[id];
      if (this.state.showans === id) {
        if(anses && anses.length == 2){
          return(
            <div id="answerscontainer" key={id}> 
              <div id="ans" style={style(anses[0])}> Answer 1: <br /> {anses[0].body} </div>
              <div id="ans" style={style(anses[1])}> Answer 2: <br /> {anses[1].body} </div>
              </div>

          )
        }else{
          return (<div id="answerscontainer" key={id}>
            <span style={{color: "red", width: "100%"}} id="ans"> No answers recorded for this question </span>
            </div>)
        }
      }
    }
    
    let questions;
    if (!this.props.questions) {
      return null;
    } else {
      questions = this.props.questions.map((question, idx) => (
        <div key={idx} className="question-item-container" onClick={()=>this.showans(question._id)}>
          <div key={idx} className="question-body">
            {question.body}
            {ans(question._id)}
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

    if (this.props.stats.all[0] !== undefined) {
      this.props.stats.all.forEach( stat => {
        this.state.stats[stat._id] = stat.AvgPercent
      })
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