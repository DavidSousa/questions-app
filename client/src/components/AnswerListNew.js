import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AnswerListNew extends Component {
  componentDidUpdate() {
    if (this.props.focusLastAnswer) {
      this.props.handleComponentUpdate();
      const position = this.props.answers.length - 1;
      const ref = `answer${position}`;
      this[ref].focus();
    }
    if (this.props.focusMissingAnswerPosition !== null) {
      this.props.handleComponentUpdate();
      const ref = `answer${this.props.focusMissingAnswerPosition}`;
      this[ref].focus();
    }
  }

  render() {
    const renderAddButton = (currentRowNumber, numberOfAnwers) => {
      if (currentRowNumber + 1 === numberOfAnwers) {
        return <button className="button-add" onClick={this.props.handleAddAnswer}>+</button>;
      }
      return null;
    };

    const answers = this.props.answers.map((answer, currentRowNumber, { length }) => (
      <li key={currentRowNumber}>
        <div className="answer">
          <input
            name="answer"
            ref={(input) => { this[`answer${currentRowNumber}`] = input; }}
            className="input new-answer"
            placeholder={`Type answer #${currentRowNumber + 1}`}
            type="text"
            value={answer}
            onChange={e => this.props.handleAnswerChange(currentRowNumber, e)}
          />
          {renderAddButton(currentRowNumber, length)}
        </div>
      </li>
    ));

    return (
      <ul className="answer-list">{answers}</ul>
    );
  }
}

AnswerListNew.propTypes = {
  focusLastAnswer: PropTypes.bool.isRequired,
  focusMissingAnswerPosition: PropTypes.bool,
  handleComponentUpdate: PropTypes.func.isRequired,
  answers: PropTypes.array.isRequired,
  handleAddAnswer: PropTypes.func.isRequired,
  handleAnswerChange: PropTypes.func.isRequired
};

AnswerListNew.defaultProps = {
  focusMissingAnswerPosition: false
};

export default AnswerListNew;
