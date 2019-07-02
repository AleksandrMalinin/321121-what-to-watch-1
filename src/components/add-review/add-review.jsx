import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import withPrivateRoute from '../../hocs/with-private-route/with-private-route.js';
import Sprite from '../sprite/sprite.jsx';
import Logo from '../logo/logo.jsx';
import UserBlock from '../user-block/user-block.jsx';
import {constants} from '../../constants.js';
import withAddReview from '../../hocs/with-add-review/with-add-review.js';

const AddReview = (props) => {
  const {
    movie,
    comment,
    handleRatingCheck,
    handleReviewChange,
    handleSubmit
  } = props;

  if (!movie) {
    return null;
  } else {
    return <React.Fragment>
      <Sprite/>

      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={movie.background_image} alt={movie.background_image} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <Logo/>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="movie-page.html" className="breadcrumbs__link">{movie.name}</a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <UserBlock/>
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={movie.poster_image} alt={movie.poster_image} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form" onSubmit={handleSubmit}>
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1" onChange={handleRatingCheck} checked/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2" onChange={handleRatingCheck}/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" onChange={handleRatingCheck}/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4" onChange={handleRatingCheck}/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5" onChange={handleRatingCheck}/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" required onChange={handleReviewChange}></textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" disabled={comment.length < constants.MIN_FIELD_LENGTH}>Post</button>
              </div>

            </div>
          </form>
        </div>
      </section>
    </React.Fragment>;
  }
};

AddReview.propTypes = {
  movie: PropTypes.object,
  comment: PropTypes.string,
  handleRatingCheck: PropTypes.func,
  handleReviewChange: PropTypes.func,
  handlePostReview: PropTypes.func,
  handleSubmit: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export {AddReview};
export default withRouter(withAddReview(withPrivateRoute(AddReview)));
