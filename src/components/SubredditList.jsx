import React, { PropTypes } from 'react';

import RadioButton from './RadioButton.jsx';

const debounce = function(fn, delay) {
  let timer = null;
  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};

class SubredditList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      availableSubreddits: props.availableSubreddits,
      updateChosenSubreddits: props.updateChosenSubreddits,
      selectedSubreddits: [],
      searchForSubreddit: '',
    };
    this.updateSelectedSubreddits = this.updateSelectedSubreddits.bind(this);
    this.queryForSubreddit = debounce(this.queryForSubreddit.bind(this), 500);
    this.updateSearchValue = this.updateSearchValue.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({availableSubreddits: nextProps.availableSubreddits});
  }
  updateSelectedSubreddits(subreddit) {
    // Grab index from array for given subreddit
    const index = this.state.selectedSubreddits.indexOf(subreddit);
    // We will clone selection and then set to new selection after mutating
    const newSelection = this.state.selectedSubreddits.slice();
    // If it isn't in array, we need to add it
    if (index === -1) {
      newSelection.push(subreddit);
    } else {
      // Otherwise we need to remove it
      newSelection.splice(index, 1);
    }
    // Update state with new selection
    this.setState({selectedSubreddits: newSelection});
    // Let's put render new pages here for now
    this.state.updateChosenSubreddits(newSelection);
  }
  queryForSubreddit() {
    console.log('being queried with value: ', this.state.searchForSubreddit);
    fetch(`https://www.reddit.com/subreddits/search/.json?q=${this.state.searchForSubreddit}&limit=20`)
      .then((response) => response.json())
      .then((json) => {
        console.log('json subreddits: ', json);
        this.setState({availableSubreddits: json.data.children})
      });
  }
  updateSearchValue(event) {
    this.setState({searchForSubreddit: event.target.value}, this.queryForSubreddit);
  }
  render() {
    return (
      <div id="available-subreddits-container">
        <h1>Available Subreddits</h1>
        <label>
          Search:
          <input
            type="text"
            value={this.state.searchForSubreddit}
            onChange={this.updateSearchValue}
          />
        </label>
        <div>
          {this.state.availableSubreddits.map((subreddit) =>
              <RadioButton
                key={subreddit.data.display_name}
                value={subreddit.data.display_name}
                onChangeFunc={this.updateSelectedSubreddits}
                buttonClass="subreddit-selection-button"
              />
          )}
        </div>
      </div>
    );
  }
}

SubredditList.propTypes = {
  updateChosenSubreddits: PropTypes.func,
  availableSubreddits: PropTypes.array,
};

export default SubredditList;