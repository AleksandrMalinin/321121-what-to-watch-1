import React from 'react';
import PropTypes from 'prop-types';
import {formateDate} from '../../utils.js';

const Review = (props) => {
  const {comment, date, rating, user} = props.comment;
  const formatedDate = formateDate(new Date(date));
  const formatedISODate = date.split(`T`)[0];

  return <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{comment}</p>

      <footer className="review__details">
        <cite className="review__author">{user.name}</cite>
        <time className="review__date" dateTime={formatedISODate}>{formatedDate}</time>
      </footer>
    </blockquote>

    <div className="review__rating">{rating}</div>
  </div>;
};

Review.propTypes = {
  comment: PropTypes.object
};

export default Review;
