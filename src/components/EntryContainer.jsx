import React, { PropTypes } from 'react';

import Thumbnail from './Thumbnail.jsx';

const Entry = ({ title, linkToStory, thumbnail, author, clickedBoolean, subreddit, score, numOfComments, commentsUrl }) => (
  <div className="entry">
    <div className="entry-image-thumbnail">
      <Thumbnail thumbnail={thumbnail} title={title} />
    </div>
    <div className="entry-data-display">
      <h3><a href={linkToStory}>{title}</a></h3>
      <div className="entry-score">{score} karma</div>
      <p className="entry-detail-text">
        submitted to <a href={'http://www.reddit.com/r/' + subreddit}>{subreddit}</a> by <a href={'http://www.reddit.com/user/' + author}>{author}</a>. <a href={commentsUrl}>({numOfComments} comments)</a>
      </p>
    </div>
  </div>
);

Entry.propTypes = {
  title: PropTypes.string,
  linkToStory: PropTypes.string,
  thumbnail: PropTypes.string,
  author: PropTypes.string,
  clickedBoolean: PropTypes.bool,
  subreddit: PropTypes.string,
  score: PropTypes.number,
  numOfComments: PropTypes.number,
  commentsUrl: PropTypes.string,
};

export default Entry;