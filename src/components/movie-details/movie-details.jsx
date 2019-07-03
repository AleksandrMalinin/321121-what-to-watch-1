import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import {getFilmId, getFilmsAlike} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import Sprite from '../sprite/sprite.jsx';
import Logo from '../logo/logo.jsx';
import UserBlock from '../user-block/user-block.jsx';
import Tabs from '../tabs/tabs.jsx';
import MovieList from '../movie-list/movie-list.jsx';
import FullVideoPlayer from '../full-video-player/full-video-player.jsx';
import withFullVideoPlayer from '../../hocs/with-full-video-player/with-full-video-player.js';

class MovieDetails extends PureComponent {
  constructor(props) {
    super(props);

    this.handleFavouriteStatusChange = this._handleFavouriteStatusChange.bind(this);
  }

  render() {
    const {movie, moviesAlike, isPlaying, fullVideoShown, isAuthorizationRequired, onPlayButtonClick} = this.props;
    const moviesAlikeCut = moviesAlike.slice(0, 4);

    if (!movie) {
      return null;
    } else {
      return <React.Fragment>
        <Sprite/>

        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={movie.background_image} alt={movie.background_image} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <Logo/>
              <UserBlock/>
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{movie.name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{movie.genre}</span>
                  <span className="movie-card__year">{movie.released}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button" onClick={onPlayButtonClick}>
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button" onClick={this.handleFavouriteStatusChange}>
                    {movie && !movie.is_favorite ?
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg> :

                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg>
                    }
                    <span>My list</span>
                  </button>
                  {!isAuthorizationRequired ?
                    <Link to={`/reviews/add/${movie.id}`} className="btn movie-card__button">Add review</Link>
                    :
                    ``
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={movie.poster_image} alt={movie.poster_image} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <Tabs
                  movie={movie}
                />
              </div>

            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <MovieList movies={moviesAlikeCut}/>
          </section>

          <footer className="page-footer">
            <div className="logo">
              <Link to="/" className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>

        {fullVideoShown ? <FullVideoPlayer onPlayButtonClick={onPlayButtonClick} movie={movie} isPlaying={isPlaying}/> : ``}
      </React.Fragment>;
    }
  }

  _handleFavouriteStatusChange() {
    const id = this.props.movie.id;
    const status = this.props.movie.is_favorite;

    if (this.props.isAuthorizationRequired) {
      return this.props.history.push(`/login`);
    }

    return this.props.onFavouriteStatusChange(id, status);
  }
}

MovieDetails.propTypes = {
  movie: PropTypes.object,
  moviesAlike: PropTypes.array,
  isPlaying: PropTypes.bool,
  fullVideoShown: PropTypes.bool,
  onPlayButtonClick: PropTypes.func,
  isAuthorizationRequired: PropTypes.bool,
  onFavouriteStatusChange: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

const mapStateToProps = (state, ownProps) => ({
  isAuthorizationRequired: getAuthorizationStatus(state),
  movie: getFilmId(state, ownProps.match.params.id),
  moviesAlike: getFilmsAlike(state, ownProps.match.params.id)
});

export {MovieDetails};
export default connect(mapStateToProps)(withRouter(withFullVideoPlayer(MovieDetails)));
