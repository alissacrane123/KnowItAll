import React from 'react';
import { Link } from 'react-router-dom';

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
    // debugger 

    return (
      <div className="index-body-container">

        <div className="index-new-container">       
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