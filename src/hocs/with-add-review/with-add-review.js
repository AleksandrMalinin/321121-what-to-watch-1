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
      return isCorrectLength(this.state.comment.length, constants.MIN_FIELD_LENGTH, constants.MAX_FIELD_LENGTH);
    }

    constructor(props) {
      super(props);

      this.state = {
        rating: 1,
        comment: ``,
        error: false
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
        error={this.state.error}
        rating={this.state.rating}
        comment={this.state.comment}
        onRatingCheck={this.handleRatingCheck}
        onReviewChange={this.handleReviewChange}
        onSubmit={this.handleSubmit}
      />;
    }

    _handleSubmit(evt) {
      evt.preventDefault();

      const {comment, rating} = this.state;

      if (this.isValidForm) {
        this.props.onPostReview(this.props.movie.id, comment, parseInt(rating, 10))
        .then((response) => {
          if (!response.error) {
            this.props.history.push(`/film/${this.props.movie.id}`);
          } else {
            this.setState({
              error: response.error
            });
          }
        });

        evt.target.reset();
      }
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
          comment: target.value
        });
      }
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
