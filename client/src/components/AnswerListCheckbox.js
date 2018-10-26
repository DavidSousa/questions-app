import React from 'react';
import PropTypes from 'prop-types';

const AnswerListCheckbox = (props) => {
  const answers = props.answers.map(answer => (
    <li key={answer.id}>
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={answer.voted}
            onChange={e => props.handleInputChange(answer.id, e)}
          />
          <i className="input-helper"></i>
          {answer.answer}
        </label>
      </div>
    </li>
  ));

  return (
    <ul className="answer-list">{answers}</ul>
  );
};

AnswerListCheckbox.propTypes = {
  answers: PropTypes.array.isRequired,
  handleInputChange: PropTypes.func.isRequired
};

export default AnswerListCheckbox;
