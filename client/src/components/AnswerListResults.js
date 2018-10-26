import React from 'react';
import PropTypes from 'prop-types';

const getVotesText = (numberOfVotes) => {
  return `${numberOfVotes} vote${numberOfVotes === 1 ? '' : 's'}`;
}

const getPercentageText = (numberOfVotes, totalOfVotes) => {
  return totalOfVotes !== 0 ? (`${((numberOfVotes / totalOfVotes) * 100).toFixed(2)}%`) : '0%';
}

const getChartBarWidth = (numberOfVotes, maxOfVotes, maxWidth) => {
  return maxOfVotes === 0 ? 0 : ((numberOfVotes * maxWidth) / maxOfVotes);
}

const AnswerListResults = (props) => {
  let totalOfVotes = 0;
  let maxOfVotes = 0;
  props.answers.forEach((answer) => {
    if (answer.votes > maxOfVotes) {
      maxOfVotes = answer.votes;
    }
    totalOfVotes += answer.votes;
  });
  const maxWidth = 500;

  const answers = props.answers.map((answer) => {
    const answerWidth = getChartBarWidth(answer.votes, maxOfVotes, maxWidth);
    const votesText = getVotesText(answer.votes);
    const percentageText = getPercentageText(answer.votes, totalOfVotes);
    return (
      <li key={answer.id}>
        <div className="chart-title">{answer.answer}</div>
        <div className="chart-wrapper">
          <div className="chart-bar" style={{ width: answerWidth }} />
          <div className="chart-label">
            {`${votesText} — ${percentageText}`}
          </div>
        </div>
      </li>
    );
  });

  return (
    <ul className="answer-list">{answers}</ul>
  );
};

AnswerListResults.propTypes = {
  answers: PropTypes.array.isRequired,
};

export default AnswerListResults;
