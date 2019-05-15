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
      questionSent: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }



  handleClick(user) {
    this.props.clearResults();
    let { updateAnswer, currentUser, friendId, friendName } = this.props
    let data;

    if (user === 'current') {
      this.setState({winner: currentUser.username});
      data = { userId: currentUser.id, questionId: this.state.questionId };
      updateAnswer(data);
    } else {
      this.setState({winner: friendName});
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

    let { newQuestion, createAnswer, poseQuestion, friendId } = this.props;
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
    // this.props.createAnswer(answer)
    // this.setState({ answer2: '' })

  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render() {
    let results;

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
      // return null;
      results = [];
    } else {
      // debugger
      results = this.props.results.map(result => (
        <Result result={result} />
      ))
      // debugger 
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

    let { friendId } = this.props;
    // debugger 

    return (
      <>
      <div className="new-body-container">

        <form className="new-form-container" onSubmit={this.handleSubmit}>
          
          <div className="question-input-container">
            <input type="textarea"
                className="question-inputs"
              value={this.state.body}
              onChange={this.update('body')}
              placeholder="Ask a question..."
            />
          </div>
 
          <div className="answers-container">
             <div className="answer-input-container">
               <input className="question-inputs"
                 value={this.state.answer1}
                 onChange={this.update('answer1')}
                 placeholder="Your answer"
               />
             </div>

            <div className="answer-input-container">
                <input className="question-inputs"
                value={this.state.answer2}
                onChange={this.update('answer2')}
                placeholder="Your friend's answer"
              />
            </div>
          </div> 
            <input className="question-inputs" type="submit" value="Submit" />
        </form>
      </div>
      <div className="results-body-container">
        <div className="results-container">
          {results}
        </div>
      </div>
      </>
      
    )
  }
}

export default QuestionCompose;