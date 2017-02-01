import React, { PropTypes } from 'react';

const Thumbnail = ({ thumbnail, title }) => {
  // If link doesn't start with http then we use default
  // TODO: uses post.data.post_hint to choose between default images
  let imageUrl;
  if (thumbnail.slice(0, 4) === 'http') {
    imageUrl = thumbnail;
  } else {
    imageUrl = './images/defaultThumbnail.jpg';
  }

  return (
    <img src={imageUrl} alt={`thumbnail for ${title}`} />
  );
};

Thumbnail.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
};

export default Thumbnail;