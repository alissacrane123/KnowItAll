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
      questionId: undefined
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ newQuestion: nextProps.newQuestion.body });
  // }

  handleSubmit(e) {
    e.preventDefault();
    let question = {
      body: this.state.body,
      authorId: this.state.authorId
    };

    let answer1;
    let answer2;

    let { newQuestion, createAnswer, poseQuestion } = this.props;

    poseQuestion(question)
      .then( 
        newQuestion => {
          // debugger
          if (newQuestion != undefined) {
            answer1 = { body: this.state.answer1, 
                        authorId: this.state.authorId,
                        questionId: newQuestion.question.data._id}
            createAnswer(answer1)

            // answer2 = { body: this.state.answer2,
            //             authorId: this.state.authorId,
            //             questionId: newQuestion.question.data._id}
            // createAnswer(answer2)
            // this.setState({ questionId: newQuestion.question.data.id})
          }
        }).then(() => this.setState({ answer1: '' }))

    this.props.fetchResults(this.state.body);
    // this.props.createAnswer(answer)
    this.setState({ body: '' })
    // this.setState({ answer2: '' })

    
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render() {
    let results;
    if (!this.props.results[0]) {
      // return null;
      results = [];
    } else {
      // debugger
      results = this.props.results.map(result => (
        <Result result={result} />
      ))
    }

    return (
      <div className="new-body-container">

        <form className="new-form-container" onSubmit={this.handleSubmit}>
          
          <div className="question-input-container">
            <input type="textarea"
              value={this.state.body}
              onChange={this.update('body')}
              placeholder="Ask a question..."
            />
            <input type="submit" value="Submit" />
          </div>
 
          <div className="answers-container">
             <div className="answer-input-container">
               <input className="answer1-input"
                 value={this.state.answer1}
                 onChange={this.update('answer1')}
                 placeholder="Your answer"
               />
             </div>

            <div className="answer-input-container">
              <input className="answer2-input"
                value={this.state.answer2}
                onChange={this.update('answer2')}
                placeholder="Your friend's answer"
              />
            </div>
          </div> 
        </form>

        <div className="results-body-container">
          <div className="results-container">
            { results }
          </div>
        </div>

      </div>
    )
  }
}

export default QuestionCompose;