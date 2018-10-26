import React, { Component } from 'react';

import Title from './Title';
import AnswerListNew from './AnswerListNew';
import { createQuestionWithAnswers } from '../actions';

const validateAnswers = (answers) => {
  let numberOfValidAnswers = 0;

  answers.forEach((answer) => {
    if (answer !== '') {
      numberOfValidAnswers += 1;
    }
  });
  return numberOfValidAnswers > 1;
};

const getFirstEmptyAnswerPosition = (answers) => {
  let position = null;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].trim() === '') {
      position = i;
      break;
    }
  }
  return position;
};

class Home extends Component {
  constructor() {
    super();
    this.state = {
      question: '',
      answers: ['', ''],
      focusLastAnswer: false,
      focusMissingAnswerPosition: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreateQuestion = this.handleCreateQuestion.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleAddAnswer = this.handleAddAnswer.bind(this);
    this.handleNewAnswerListComponentUpdate = this.handleNewAnswerListComponentUpdate.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleAnswerChange(currentRowNumber, e) {
    const newAnswers = this.state.answers;
    newAnswers[currentRowNumber] = e.target.value;
    this.setState({
      answers: newAnswers
    });
  }

  handleAddAnswer() {
    const newAnswers = this.state.answers;
    newAnswers.push('');
    this.setState({
      answers: newAnswers,
      focusLastAnswer: true
    });
  }

  handleCreateQuestion() {
    const question = this.state.question;
    const answers = this.state.answers;
    const history = this.props.history;

    if ((!question) || (answers.length === 0)) {
      this.questionInput.focus();
    } else if (!validateAnswers(answers)) {
      const position = getFirstEmptyAnswerPosition(answers);
      this.setState({
        focusMissingAnswerPosition: position
      });
    } else {
      const validAnswers = answers.filter((answer) => {
        return answer.trim() !== '';
      });
      createQuestionWithAnswers(question, validAnswers, history);
    }
  }

  handleNewAnswerListComponentUpdate() {
    this.setState({
      focusLastAnswer: false,
      focusMissingAnswerPosition: null
    });
  }

  render() {
    return (
      <div className="main">
        <div className="card">
          <Title text={this.state.question} defaultText="New Question" />
          <input
            name="question"
            ref={(input) => { this.questionInput = input; }}
            className="input"
            placeholder="Type your question"
            autoFocus="autofocus"
            type="text"
            value={this.state.question}
            onChange={this.handleInputChange}
          />
          <AnswerListNew
            answers={this.state.answers}
            focusLastAnswer={this.state.focusLastAnswer}
            focusMissingAnswerPosition={this.state.focusMissingAnswerPosition}
            handleAnswerChange={this.handleAnswerChange}
            handleAddAnswer={this.handleAddAnswer}
            handleComponentUpdate={this.handleNewAnswerListComponentUpdate}
          />
          <div className="bottom">
            <button
              className="button-finish red"
              onClick={this.handleCreateQuestion}
            >CREATE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
