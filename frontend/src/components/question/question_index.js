import React from 'react';
import { Link } from 'react-router-dom';

class QuestionIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = { questions: [] }
  }


  componentDidMount() {
    this.props.fetchQuestions();
  }

  // componentDidUpdate(newState) {
  //   this.setState({ questions: newState.questions })
  // }

  render() {
    // if (!this.props.questions) {
    //   return null;
    // } else {
    //   let questions = this.props.questions
    // }
    // debugger 

    return (
      <div className="index-body-container">

        <div className="index-new-container">
        
        </div>

        <div className="index-questions-container">


        </div>

      </div>
    )
  }
}

export default QuestionIndex;