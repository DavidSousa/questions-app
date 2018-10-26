import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { debounce } from 'throttle-debounce';

import { getQuestions } from '../../actions';

class SearchInput extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      showList: false,
      questions: []
    };
    this.getQuestions = debounce(500, this.getQuestions);
  }

  getQuestions = () => {
    getQuestions()
    .then((response) => {
      const search = this.state.search;
      let questions = [];
      response.data.forEach((question) => {
        if (question.question.includes(search)) {
          questions.push({
            id: question._id,
            question: question.question
          })
        }
      });
      const showList = questions.length !== 0;
      this.setState({
        questions: questions,
        showList: showList
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleSearchChange = (e) => {
    this.setState({
      search: e.target.value
    });
    this.getQuestions();
  }

  handleChooseQuestion = (questionId, e) => {
    this.setState({
      search: '',
      showList: false,
      questions: []
    })
    this.props.history.push(`/${questionId}`);
    window.location.reload();
  }

  render() {
    let questionList = null;
    if(this.state.showList) {
      questionList = <ul className="search-results"> {
        this.state.questions.map((question) => {
          return (
            <li key={question.id}>
              <div onClick={e => this.handleChooseQuestion(question.id, e)}>{question.question}</div>
            </li>
          )
      })} </ul>
    }

    return (
      <div>
        <input 
          value={this.state.search}
          onChange={this.handleSearchChange}
          className="input search"
          placeholder="Search..."
        />
        {questionList}
      </div>
    );
  }
}

export default withRouter(SearchInput);
