import React from 'react';
import { render} from 'react-dom';

import Entry from './components/EntryContainer.jsx';
import SubredditList from './components/SubredditList.jsx';

const container = document.getElementById('app');


// TODO: allow users to configure subreddits
// We want a list of all subreddits
  // When a subreddit is clicked it adds or removes to list
  // When list is changed a new request to reddit is sent
  // TODO: Don't send another request to reddit for subreddit's already loaded? (Think about how to organize new/old entries on page);

// TO GET MULTIPLE SUBREDDITS:
// Just link the subreddit name values with a plus sign
// e.g. https://www.reddit.com/r/funny+pics+videos/.json
class AppContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      availableSubreddits: [],
      chosenSubreddits: '',
      before: null,
      after: null,
    };
    this.updateChosenSubreddits = this.updateChosenSubreddits.bind(this);
    this.loadMoreEntries = this.loadMoreEntries.bind(this);
  }
  componentDidMount() {
    // Load chosen subreddits
    // Empty string will default to frontpage
    this.fetchSubredditsFromReddit();
    // We should only need to list possible subreddits once so it can stay in here
    fetch('https://www.reddit.com/subreddits/.json?limit=100')
      .then((response) => response.json())
      .then((json) => this.setState({availableSubreddits: json.data.children}));
  }
  fetchSubredditsFromReddit() {
    // Let's break out the fetch functionality so we can reuse for reloading
    fetch(`http://www.reddit.com/${this.state.chosenSubreddits}/.json`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({entries: json.data.children});
        this.setState({before: json.data.before});
        this.setState({after: json.data.after});
      });
  }
  updateChosenSubreddits(listOfSubreddits) {
    // listOfSubreddits will be array of subs the user wants to view
    const newList = listOfSubreddits.length > 0 ? '/r/' + listOfSubreddits.join('+') : '';
    this.setState({chosenSubreddits: newList}, this.fetchSubredditsFromReddit);
  }
  loadMoreEntries(prevOrNext) {
    console.log('http://www.reddit.com/${this.state.chosenSubreddits}.json?${prevOrNext}=${this.state.prevOrNext}`: ', `http://www.reddit.com/${this.state.chosenSubreddits}.json?${prevOrNext}=${this.state[prevOrNext]}`)
    // TODO: refactor the fetchSubredditsFromReddit function to handle this
    fetch(`http://www.reddit.com/${this.state.chosenSubreddits}.json?${prevOrNext}=${this.state[prevOrNext]}`)
      .then((response) => response.json())
      .then((json) => this.setState({entries: json.data.children}));

  }
  render() {
    return (
      <div>
        <h1 id="site-title">Reddit Reader</h1>
        <SubredditList
          availableSubreddits={this.state.availableSubreddits}
          updateChosenSubreddits={this.updateChosenSubreddits}
        />
        <div id="results-list">
          <h2>
            {this.state.chosenSubreddits === '' ? 'Front Page' : this.state.chosenSubreddits.slice(3).split('+').join(', ')}
          </h2>
          <hr />
          {this.state.entries.map((post) =>
            // Only show SFW results
            post.data.over_18 === false ?
              <Entry
                key={post.data.id}
                title={post.data.title}
                linkToStory={post.data.url}
                // TODO: add preview/peek option
                thumbnail={post.data.thumbnail}
                // TODO: create LINK to author profile
                author={post.data.author}
                // Grey out clicked posts
                clickedBoolean={post.data.clicked}
                subreddit={post.data.subreddit}
                score={post.data.score}
                numOfComments={post.data.num_comments}
                commentsUrl={'www.reddit.com' + post.data.permalink}
              />
              :
              null
          )}
          <hr />
        </div>
        <div className="pagination-buttons">
          <button
            id="pagination-next"
            onClick={() => this.loadMoreEntries('before')}
          >
            prev
          </button>
          <button
            id="pagination-next"
            onClick={() => this.loadMoreEntries('after')}
          >
            next
          </button>
        </div>
      </div>
    );
  }
}


render(<AppContainer />, container);