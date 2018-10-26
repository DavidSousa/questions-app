import React from 'react';
import PropTypes from 'prop-types';

const Title = (props) => {
  if (props.text) {
    return <h1 className="title">{props.text}</h1>;
  }

  return <h1>{props.defaultText}</h1>;
};

Title.propTypes = {
  text: PropTypes.string.isRequired,
  defaultText: PropTypes.string
};

Title.defaultProps = {
  defaultText: ''
};

export default Title;
