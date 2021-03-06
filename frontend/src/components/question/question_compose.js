import React from 'react';
import Result from './results';
import { Link } from 'react-router-dom';

class QuestionCompose extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      body: "",
      authorId: this.props.currentUser.id,
      friendId: '',
      answer1: '',
      answer2: '',
      questionId: undefined,
      winner: '',
      questionSent: false,
      friendAvatar: '',
      userAvatar: '',
      friend: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // persists friend & avatar on refresh, grab from localstorage 
  // credit: https://hackernoon.com/how-to-take-advantage-of-local-storage-in-your-react-projects-a895f2b2d3f2
  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage()
  }

  componentWillUnmount() {
    this.props.clearResults();
  }

  handleClick(user) {
    this.props.clearResults();
    let { updateAnswer, currentUser } = this.props;
    let data;
    

    if (user === 'current') {
      this.setState({winner: currentUser.username});
      data = { userId: currentUser.id, questionId: this.state.questionId };
      updateAnswer(data);
    } else {
      this.setState({winner: this.state.friend});
      data = { userId: this.state.friendId, questionId: this.state.questionId};
      updateAnswer(data);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    let question = {
      body: this.state.body,
      authorId: this.state.authorId
    };
    let answer1;
    let answer2;
    this.setState({questionSent: true})
    let { createAnswer, poseQuestion } = this.props;
    poseQuestion(question)
      .then( 
        newQuestion => {
          if (newQuestion !== undefined) {
            answer1 = { body: this.state.answer1, 
                        authorId: this.state.authorId,
                        questionId: newQuestion.question.data._id};
            createAnswer(answer1);
            answer2 = { body: this.state.answer2,
                        authorId: this.state.friendId,
                        questionId: newQuestion.question.data._id};
            createAnswer(answer2);
            this.setState({ questionId: newQuestion.question.data.id});
          }
        })

    this.props.fetchResults(this.state.body);
    document.getElementsByClassName("general-button")[0].classList.add("question-submit-fade-out");
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  questionSubmitButton() {
    if(this.state.body && this.state.answer1 && this.state.answer2) {
      return <input className="general-button" type="submit" value="Submit" />
    } else {
      return <input className="general-button" disabled type="submit" value="Submit" />
    }
  }

  render() {
    let results;

    if(this.state.winner !== ""){
      return (
        <div className="body-container">
          <iframe src="https://giphy.com/embed/aWRWTF27ilPzy" width="480" height="359" frameBorder="0" title="skeletor" class="giphy-embed" allowFullScreen></iframe>
          <h1 className="centered-text">{this.state.winner || "brett"} wins!</h1>
          <Link to={'/questions'}>...Back to the Feed</Link>
        </div>
      )
    }
    else if(!this.props.results[0] && this.state.questionSent === true ) {
      results = <div className="lds-facebook"><div></div><div></div><div></div></div>}
    else if(!this.props.results[0]) {
      results = [];
    } else {
      results = this.props.results.map(result => (
        <Result result={result} />
      ))
      results.unshift(
        <div className="winner-container">
          <div className="container-list-row-center">
              <button className="general-button win-button" onClick={() =>this.handleClick('current')}>I WON</button>
            <button className="general-button lost-button" onClick={()=>this.handleClick('friend')}>FRIEND WON</button>
          </div>
        </div>
      )
    }

    return (
      <div className="body-container">
          <form className="new-form-container" onSubmit={this.handleSubmit}>
            <div className="fight-bar"></div>
            <div className="container-list-col-center">
              <div className="centered-text"><h2>ASK YOUR QUESTION</h2></div>
              <div className="container-list-col-center">
                <input type="textarea"
                  className="general-input-grey"
                  value={this.state.body}
                  onChange={this.update('body')}
                  placeholder="ex: How old is Queen Elizabeth II?"
                />
              </div>
            </div>
            <section className="question-media">
                <div className="question-media-player-left">
                  <h2>{this.props.currentUser.username}</h2>
                  <div className="question-img--wrapper">
                    <img height="100" src={this.state.userAvatar}></img>
                  </div>
                </div>
                <div className="question-media-player-right">
                  <h2>{this.state.friend}</h2>
                  <div className="question-img--wrapper">
                    <img height="100" src={this.state.friendAvatar}></img>
                  </div>
                </div>
            </section>

            <div className="container-2-3-col">
              <div className="container-list-row-l-r">
                <div className="container-list-col-center">
                  <input className="general-input-grey"
                    value={this.state.answer1}
                    onChange={this.update('answer1')}
                    placeholder="ex: 89 years old"
                  />
                </div>
                <div className="container-list-col-center">
                  <input className="general-input-grey"
                    value={this.state.answer2}
                    onChange={this.update('answer2')}
                    placeholder="ex: 93 years old"
                  />
                </div>
              </div>
            </div> 
            {this.questionSubmitButton()}
          </form>

        <div className="container-list-col-center">
          {results}
        </div>
      </div>  
    )
  }
}

export default QuestionCompose;