import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Operation} from '../../reducer/user/user.js';
import {getFilmId} from '../../reducer/data/selectors.js';
import {isCorrectLength} from '../../utils.js';
import {constants} from '../../constants.js';

const withAddReview = (Component) => {
  class WithAddReview extends PureComponent {
    get isValidForm() {
      return this.state.rating !== 0 && isCorrectLength(this.state.comment.length, constants.MIN_FIELD_LENGTH, constants.MAX_FIELD_LENGTH);
    }

    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        comment: ``
      };

      this.handleRatingCheck = this._handleRatingCheck.bind(this);
      this.handleReviewChange = this._handleReviewChange.bind(this);
      this.handleSubmit = this._handleSubmit.bind(this);
    }

    render() {
      const {movie} = this.props;

      return <Component
        {...this.props}
        movie={movie}
        comment={this.state.comment}
        handleRatingCheck={this.handleRatingCheck}
        handleReviewChange={this.handleReviewChange}
        handleSubmit={this.handleSubmit}
      />;
    }

    _handleSubmit(evt) {
      evt.preventDefault();

      const {comment, rating} = this.state;

      if (this.isValidForm) {
        this.props.handlePostReview(this.props.movie.id, comment, parseInt(rating, 10))
        .then((response) => {
          if (!response.error) {
            return this.props.history.push(`/film/${this.props.movie.id}`);
          }

          throw new Error(`Something went wrong :/`);
        });
      }

      evt.target.reset();
    }

    _handleRatingCheck(evt) {
      const target = evt.target;

      if (evt) {
        this.setState({
          rating: target.value
        });
      }
    }

    _handleReviewChange(evt) {
      const target = evt.target;

      if (evt) {
        this.setState({
          comment: target.value,
        });
      }
    }
  }

  WithAddReview.propTypes = {
    movie: PropTypes.object,
    handlePostReview: PropTypes.func,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  };

  const mapStateToProps = (state, ownProps) => ({
    movie: getFilmId(state, ownProps.match.params.id)
  });

  const mapDispatchToProps = (dispatch) => ({
    handlePostReview: (id, comment, rating) => {
      return dispatch(Operation.addReview(id, comment, rating));
    }
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithAddReview);
};

export default withAddReview;
