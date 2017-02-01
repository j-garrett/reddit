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
    console.log('app container created');
    this.state = {
      entries: [],
      // Empty string will default to frontpage
      chosenSubreddits: '',
      availableSubreddits: [],
    };
    this.updateChosenSubreddits.bind(this);
  }
  componentDidMount() {
    // Load chosen subreddits
    this.fetchSubredditsFromReddit();
    // We should only need to list possible subreddits once so it can stay in here
    fetch('https://www.reddit.com/subreddits/.json')
      .then((response) => response.json())
      .then((json) => this.setState({availableSubreddits: json.data.children}));
  }
  fetchSubredditsFromReddit() {
    // Let's break out the fetch functionality so we can reuse for reloading
    fetch(`http://www.reddit.com/${this.state.chosenSubreddits}/.json`)
      .then((response) => response.json())
      .then((json) => this.setState({entries: json.data.children}));
  }
  updateChosenSubreddits(listOfSubreddits) {
    // listOfSubreddits will be array of subs the user wants to view
    this.setState({chosenSubreddits: listOfSubreddits.join('+')});
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
            {this.state.chosenSubreddits === '' ? 'Front Page' : this.state.chosendSubreddits}
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
              />
              :
              null
          )}
          <hr />
        </div>
        {/*
        TODO: pagination buttons that actually work
        */}
        <div className="pagination-buttons">
          <button id="pagination-prev">prev</button>
          <button id="pagination-next">next</button>
        </div>
      </div>
    );
  }
}


render(<AppContainer />, container);