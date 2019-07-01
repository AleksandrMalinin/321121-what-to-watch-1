import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Operation} from '../../reducer/user/user.js';
import {getFilmId} from '../../reducer/data/selectors.js';
import {isCorrectLength} from '../../utils.js';
import {constants} from '../../constants.js';

const withAddReview = (Component) => {
  class WithAddReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        comment: ``
      };

      this.onRatingCheck = this._onRatingCheck.bind(this);
      this.onReviewChange = this._onReviewChange.bind(this);
      this.onSubmit = this._onSubmit.bind(this);
    }

    render() {
      const {movie} = this.props;

      return <Component
        {...this.props}
        movie={movie}
        comment={this.state.comment}
        onRatingCheck={this.onRatingCheck}
        onReviewChange={this.onReviewChange}
        onSubmit={this.onSubmit}
      />;
    }

    _onSubmit(evt) {
      evt.preventDefault();

      const {comment, rating} = this.state;

      if (this.isValidForm) {
        this.props.onPostReview(this.props.movie.id, comment, parseInt(rating, 10))
        .then((response) => {
          if (!response.error) {
            return this.props.history.push(`/film/${this.props.movie.id}`);
          }

          throw new Error(`Something went wrong :/`);
        });
      }

      evt.target.reset();
    }

    _onRatingCheck(evt) {
      const target = evt.target;

      if (evt) {
        this.setState({
          rating: target.value
        });
      }
    }

    _onReviewChange(evt) {
      const target = evt.target;

      if (evt) {
        this.setState({
          comment: target.value,
        });
      }
    }

    get isValidForm() {
      return this.state.rating !== 0 && isCorrectLength(this.state.comment.length, constants.MIN_FIELD_LENGTH, constants.MAX_FIELD_LENGTH);
    }
  }

  WithAddReview.propTypes = {
    movie: PropTypes.object,
    onPostReview: PropTypes.func,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  };

  const mapStateToProps = (state, ownProps) => ({
    movie: getFilmId(state, ownProps.match.params.id)
  });

  const mapDispatchToProps = (dispatch) => ({
    onPostReview: (id, comment, rating) => {
      return dispatch(Operation.addReview(id, comment, rating));
    }
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithAddReview);
};

export default withAddReview;
