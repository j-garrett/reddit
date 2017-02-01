import React, { PropTypes } from 'react';

class SubredditList extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }
  render() {
    return (
      <div id="available-subreddits-container">
        <h1>Available Subreddits</h1>
      </div>
    );
  }
}

SubredditList.propTypes = {
  updateChosenSubreddits: PropTypes.func,
  availableSubreddits: PropTypes.array,
};

export default SubredditList;