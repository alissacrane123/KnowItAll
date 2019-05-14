import React from 'react';
// import QuestionBox from './question_box';

class QuestionCompose extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      body: "",
      authorId: this.props.currentUser.id
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

    this.props.poseQuestion(question);
    this.setState({ body: '' })
  }

  update() {
    return e => this.setState({
      body: e.currentTarget.value
    });
  }

  render() {
    return (
      <div className="new-question-container">
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="textarea"
              value={this.state.body}
              onChange={this.update()}
              placeholder="Ask a question..."
            />
            <input type="submit" value="Submit" />
          </div>
        </form>
        <br />
        {/* <QuestionBox text={this.state.newQuestion} /> */}
      </div>
    )
  }
}

export default QuestionCompose;