import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import socketIoClient from 'socket.io-client';

import Title from './Title';
import AnswerListResults from './AnswerListResults';
import CopyURLButton from './CopyURLButton';
import { getQuestion, getAnswer } from '../actions';

class QuestionResults extends Component {
  constructor() {
    super();
    this.state = {
      question: '',
      answers: []
    };
    this.subscribeAnswersSocket = this.subscribeAnswersSocket.bind(this);
  }

  componentWillMount() {
    getQuestion(this.props.match.params.id)
      .then((response) => {
        const newAnswers = response.data.answers.map((answer) => {
          return {
            id: answer._id,
            answer: answer.answer,
            votes: answer.votes
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

  componentDidMount() {
    this.subscribeAnswersSocket();
  }

  subscribeAnswersSocket() {
    const socket = socketIoClient('/answers');
    socket.on('newVote', (answerId) => {
      getAnswer(answerId)
        .then((response) => {
          const newAnswers = this.state.answers;
          const position = newAnswers.findIndex((answer) => {
            return answer.id === answerId;
          });
          if (position !== -1) {
            newAnswers[position].votes = response.data.votes;
            this.setState({
              answers: newAnswers
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
  
  handleGoBack = () => {
    this.props.history.push(`/${this.props.match.params.id}`);
  }

  render() {
    return (
      <div className="main">
        <div className="card">
          <Title text={this.state.question} />
          <AnswerListResults answers={this.state.answers} />
          <div className="bottom">
            <div className="column">
              <button className="button-finish red" onClick={this.handleGoBack}>GO BACK</button>
            </div>
            <div className="column right">
              <CopyURLButton className="button-finish white"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(QuestionResults);
