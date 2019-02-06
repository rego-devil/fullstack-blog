import React from 'react';
import PropTypes from 'prop-types';

const style = {
  margin: '20px auto 0 auto',
  maxWidth: '300px',
};

export const Post = ({title, _id, text, date, onRemovePost }) => (

  <div className="card blue-grey darken-1" style={style}>
    <div className="card-content white-text">
      <span className="card-title">{title}</span>
      <p>{text}</p>
      <small>{new Date(date).toDateString()}</small>
    </div>
    <div className="card-action">
      <button type="button" className="btn btn-small" onClick={() => onRemovePost(_id)}>Delete</button>
    </div>
  </div>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  date: PropTypes.string,
  onRemovePost: PropTypes.func,
  _id: PropTypes.string,
};
