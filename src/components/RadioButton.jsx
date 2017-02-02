import React, { PropTypes } from 'react';

const RadioButton = ({ value, onChangeFunc, buttonClass }) => (
  <div className={buttonClass}>
    <button
      onClick={() => {
        // Input value needs to be string with subreddit name
        // It will be added to fetch string
        onChangeFunc(value);
      }}
    >
    {value}
    </button>
    <br />
  </div>
);

RadioButton.propTypes = {
  value: PropTypes.string,
  onChangeFunc: PropTypes.func,
};

export default RadioButton;