import React from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyURLButton = (props) => {
  return (
    <CopyToClipboard text={window.location.href}>
      <button className={props.className}>COPY URL</button>
    </CopyToClipboard>
  );
};

CopyURLButton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default CopyURLButton;
