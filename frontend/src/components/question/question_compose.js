import React from 'react';
// import QuestionBox from './question_box';

class QuestionCompose extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      newQuestion: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ newQuestion: nextProps.newQuestion.text });
  }

  handleSubmit(e) {
    e.preventDefault();
    let question = {
      text: this.state.text
    };

    this.props.poseQuestion(question);
    this.setState({ text: '' })
  }

  update() {
    return e => this.setState({
      text: e.currentTarget.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="textarea"
              value={this.state.text}
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