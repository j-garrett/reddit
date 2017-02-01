import React, { PropTypes } from 'react';

import Thumbnail from './Thumbnail.jsx';

const Entry = ({ title, linkToStory, thumbnail, author, clickedBoolean, subreddit, score }) => (
  <div className="entry">
    <h3><a href={linkToStory}>{title}</a></h3>
    <Thumbnail thumbnail={thumbnail} title={title} />
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
};

export default Entry;