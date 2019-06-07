import React from 'react';
import Result from './results';

class QuestionCompose extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      body: "",
      authorId: this.props.currentUser.id,
      otherUserId: '',
      answer1: '',
      answer2: '',
      questionId: undefined,
      winner: '',
      questionSent: false,
      friendAvatar: '',
      friend: ''
    }

    let userAvatar;

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
    let { updateAnswer, currentUser } = this.props
    let friendId = this.props.fetchFriendByUsername(this.state.friend)._id;
    let data;

    if (user === 'current') {
      this.setState({winner: currentUser.username});
      data = { userId: currentUser.id, questionId: this.state.questionId };
      updateAnswer(data);
    } else {
      this.setState({winner: this.state.friend});
      data = { userId: friendId, questionId: this.state.questionId};
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
    let friendId = this.props.fetchFriendByUsername(this.state.friend)._id;

    poseQuestion(question)
      .then( 
        newQuestion => {
          if (newQuestion !== undefined) {
            answer1 = { body: this.state.answer1, 
                        authorId: this.state.authorId,
                        questionId: newQuestion.question.data._id}
            createAnswer(answer1)

            answer2 = { body: this.state.answer2,
                        authorId: friendId,
                        questionId: newQuestion.question.data._id}
            createAnswer(answer2)
            this.setState({ questionId: newQuestion.question.data.id})
          }
        })

    this.props.fetchResults(this.state.body);
    document.getElementsByClassName("question-submit")[0].classList.add("question-submit-fade-out");
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  questionSubmitButton() {
    if(this.state.body && this.state.answer1 && this.state.answer2) {
      return <input className="question-submit" type="submit" value="Submit" />
    } else {
      return <input className="question-submit" disabled type="submit" value="Submit" />
    }
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
    let results;
    let userAvatar;

    if(this.state.winner !== ""){
      return (
        <div className="new-form-container" style={{paddingTop: "90px"}}>
          <iframe src="https://giphy.com/embed/aWRWTF27ilPzy" width="480" height="359" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
          <h1>{this.state.winner} wins!</h1>
      </div>
        )
    }
    else if(!this.props.results[0] && this.state.questionSent === true ) {
      results = ["LOADING RESULTS"]}
    else if(!this.props.results[0]) {
      results = [];
    } else {
      results = this.props.results.map(result => (
        <Result result={result} />
      ))
      results.unshift(
        <div className="buttons-container">
          <div className="current-button">
            <button onClick={() =>this.handleClick('current')}>I WON</button>
          </div>
          <div className="current-button">
            <button onClick={()=>this.handleClick('friend')}>FRIEND WON</button>
          </div>
        </div>
      )
    }

    if (!this.props.stats.user[0]) {
      return null;
    } else {
      let score = this.props.stats.user[0].AvgPercent;
      userAvatar = this.assignAvatar(score)
    }

    return (
      <div className="new-body-wrapper">
        <div className="new-body-container">
          <form className="new-form-container" onSubmit={this.handleSubmit}>
            <div className="fight-bar"></div>
            <div className="question-input-container">
              <h2>ASK YOUR QUESTION</h2>
              <input type="textarea"
                  className="question-inputs"
                value={this.state.body}
                onChange={this.update('body')}
                placeholder="ex: Do doves cry?"
              />
            </div>
            <section className="question-media">
                <div className="question-media--player">
                  <h2>{this.props.currentUser.username}</h2>
                  <div className="question-img--wrapper">
                  <img id="slide-left" height="100" src={userAvatar}></img>
                  </div>
                </div>
                <div className="question-media--player">
                  <h2>{this.state.friend}</h2>
                  <div className="question-img--wrapper">
                  <img id="slide-right" height="100" src={this.state.friendAvatar}></img>
                  </div>
                </div>
            </section>
            <div className="answers-container">
              <div className="answer-input-container">
                <input className="question-inputs"
                  value={this.state.answer1}
                  onChange={this.update('answer1')}
                  placeholder="ex: Yes, (TY Prince)"
                />
              </div>
              <div className="answer-input-container">
                  <input className="question-inputs"
                  value={this.state.answer2}
                  onChange={this.update('answer2')}
                  placeholder="ex: No Way"
                />
              </div>
            </div> 
              {this.questionSubmitButton()}
          </form>
        </div>

        <div className="results-body-container">
          <div className="results-container">
            {results}
          </div>
        </div>
      </div>  
    )
  }
}

export default QuestionCompose;