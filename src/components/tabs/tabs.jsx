import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Operation} from '../../reducer/user/user.js';
import {getComments} from '../../reducer/user/selectors.js';
import PropTypes from 'prop-types';
import {constants} from '../../constants.js';
import {getRatingLevel} from '../../utils.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import TabContent from '../tab-content/tab-content.jsx';
import Review from '../review/review.jsx';

class Tabs extends PureComponent {
  constructor() {
    super();

    this.onTabSwitch = (genre) => this._onTabSwitch.bind(this, genre);
  }

  render() {
    const {movie, activeItem, comments} = this.props;
    const tabNames = constants.TAB_NAMES;

    if (comments) {
      comments.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    }

    if (!movie) {
      return null;
    } else {
      return <React.Fragment>
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {tabNames.map((tabName, i) => <li className={`movie-nav__item ` + (activeItem === tabName ? `movie-nav__item--active` : ``)} key={i}>
              <a href="#" className="movie-nav__link" onClick={this.onTabSwitch(tabName)}>{tabName}</a>
            </li>)}
          </ul>
        </nav>

        <TabContent activeItem={activeItem} tabName={`Overview`}>
          <div className="movie-rating">
            <div className="movie-rating__score">{movie.rating}</div>
            <p className="movie-rating__meta">
              <span className="movie-rating__level">{getRatingLevel(movie.rating)}</span>
              <span className="movie-rating__count">{movie.scores_count} ratings</span>
            </p>
          </div>

          <div className="movie-card__text">
            <p>{movie.description}</p>

            <p className="movie-card__director"><strong>{movie.director}</strong></p>

            <p className="movie-card__starring"><strong>{movie.starring.join(`, `)} and other</strong></p>
          </div>
        </TabContent>

        <TabContent activeItem={activeItem} tabName={`Details`}>
          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Director</strong>
              <span className="movie-card__details-value">{movie.director}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Starring</strong>
              <span className="movie-card__details-value">
                {movie.starring.join(`, `)}
              </span>
            </p>
          </div>

          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Run Time</strong>
              <span className="movie-card__details-value">{movie.running}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Genre</strong>
              <span className="movie-card__details-value">{movie.genre}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Released</strong>
              <span className="movie-card__details-value">{movie.released}</span>
            </p>
          </div>
        </TabContent>

        <TabContent activeItem={activeItem} tabName={`Reviews`}>
          <div className="movie-card__reviews-col">
            {comments ? comments.map((comment) => <Review
              comment={comment}
              key={comment.id}
            />).slice(0, comments.length / 2) :
              ``
            }
          </div>
          <div className="movie-card__reviews-col">
            {comments ? comments.map((comment) => <Review
              comment={comment}
              key={comment.id}
            />).slice(comments.length / 2) :
              ``
            }
          </div>
        </TabContent>
      </React.Fragment>;
    }
  }

  _onTabSwitch(name, event) {
    event.preventDefault();
    this.props.onChange(name);
  }

  componentDidMount() {
    if (this.props.movie) {
      this.props.onLoadComments(this.props.movie.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.movie.id !== this.props.movie.id) {
      this.props.onLoadComments(this.props.movie.id);
    }
  }
}

Tabs.propTypes = {
  movie: PropTypes.object,
  activeItem: PropTypes.string,
  comments: PropTypes.array,
  onChange: PropTypes.func,
  onLoadComments: PropTypes.func
};

const mapStateToProps = (state) => ({
  comments: getComments(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadComments: (id) => {
    dispatch(Operation.loadComments(id));
  }
});

export {Tabs};
export default connect(mapStateToProps, mapDispatchToProps)(withActiveItem(constants.DEFAULT_TAB)(Tabs));
