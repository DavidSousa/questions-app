import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import socketIoClient from 'socket.io-client';

import Title from './Title';
import AnswerListCheckbox from './AnswerListCheckbox';
import CopyURLButton from './CopyURLButton';
import { getQuestion, addVote } from '../actions';

class QuestionAnswer extends Component {
  constructor() {
    super();
    this.state = {
      question: '',
      answers: []
    };
    this.handleVoteClick = this.handleVoteClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleResultsClick = this.handleResultsClick.bind(this);
  }

  componentWillMount() {
    getQuestion(this.props.match.params.id)
      .then((response) => {
        const newAnswers = response.data.answers.map((answer) => {
          return {
            id: answer._id,
            answer: answer.answer,
            voted: false
          };
        });
        this.setState({
          question: response.data.question,
          answers: newAnswers
        });
      })
      .catch((error) => {
        console.error(error);
        this.props.history.push('/');
      });
  }

  handleInputChange(answerId, e) {
    const newAnswers = this.state.answers;
    const changedAnswerIndex = newAnswers.findIndex(answer => answer.id === answerId);
    newAnswers[changedAnswerIndex].voted = !newAnswers[changedAnswerIndex].voted;
    this.setState({ answers: newAnswers });
  }

  handleVoteClick() {
    const promises = [];
    const socket = socketIoClient('/answers');
    let answersVoted = false;
    this.state.answers.forEach((answer) => {
      if (answer.voted) {
        answersVoted = true;
        promises.push(
          addVote(answer.id)
            .then((response) => {
              socket.emit('newVote', response.data._id);
            })
            .catch((error) => {
              console.error(error);
            })
        );
      }
    });

    Promise.all(promises).then(() => {
      if (answersVoted) {
        this.props.history.push(`/${this.props.match.params.id}/results`);
      }
    });
  }

  handleResultsClick() {
    this.props.history.push(`/${this.props.match.params.id}/results`);
  }

  render() {
    return (
      <div className="main">
        <div className="card">
          <Title text={this.state.question} />
          <AnswerListCheckbox
            answers={this.state.answers}
            handleInputChange={this.handleInputChange}
          />
          <div className="bottom">
            <div className="column">
              <button className="button-finish red" onClick={this.handleVoteClick}>VOTE</button>
            </div>
            <div className="column right">
              <button
                className="button-finish white"
                onClick={this.handleResultsClick}
              >RESULTS
              </button>
              <CopyURLButton className="button-finish white" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(QuestionAnswer);
