import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import {getPromoFilm} from '../../reducer/data/selectors.js';
import Sprite from '../sprite/sprite.jsx';
import Logo from '../logo/logo.jsx';
import UserBlock from '../user-block/user-block.jsx';
import MovieList from '../movie-list/movie-list.jsx';
import GenresList from '../genres-list/genres-list.jsx';
import ShowMore from '../show-more/show-more.jsx';
import FullVideoPlayer from '../full-video-player/full-video-player.jsx';
import withFullVideoPlayer from '../../hocs/with-full-video-player/with-full-video-player.js';

class MainScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.handleFavouriteStatusChange = this._handleFavouriteStatusChange.bind(this);
  }

  render() {
    const {
      moviePromo,
      moviesList,
      moviesLength,
      moviesShown,
      genres,
      handleGenreChange,
      isAuthorizationRequired,
      handleMoreButtonClick,
      isPlaying,
      fullVideoShown,
      handlePlayButtonClick
    } = this.props;

    return <React.Fragment>
      <Sprite/>

      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={moviePromo ? moviePromo.background_image : ``} alt={moviePromo ? moviePromo.background_image : ``} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <Logo/>
          <UserBlock/>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={moviePromo ? moviePromo.poster_image : ``} alt={moviePromo ? moviePromo.poster_image : ``} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{moviePromo ? moviePromo.name : ``}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{moviePromo ? moviePromo.genre : ``}</span>
                <span className="movie-card__year">{moviePromo ? moviePromo.released : ``}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={handlePlayButtonClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button" onClick={this.handleFavouriteStatusChange}>
                  {moviePromo && !moviePromo.is_favorite ?
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
                  <Link to={`/reviews/add/${moviePromo ? moviePromo.id : ``}`} className="btn movie-card__button">Add review</Link>
                  :
                  ``
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList
            genres={genres}
            handleGenreChange={handleGenreChange}
          />

          <MovieList
            movies={moviesList}
            moviesShown={moviesShown}
          />

          {moviesLength > moviesShown ?
            <ShowMore
              movies={moviesList}
              moviesLength={moviesLength}
              moviesShown={moviesShown}
              handleMoreButtonClick={handleMoreButtonClick}
            /> : ``
          }

        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>

      {fullVideoShown ? <FullVideoPlayer
        handlePlayButtonClick={handlePlayButtonClick}
        movie={moviePromo}
        isPlaying={isPlaying}/> : ``
      }
    </React.Fragment>;
  }

  _handleFavouriteStatusChange() {
    const id = this.props.moviePromo.id;
    const status = this.props.moviePromo.is_favorite;

    if (this.props.isAuthorizationRequired) {
      return this.props.history.push(`/login`);
    }

    return this.props.handleFavouriteStatusChange(id, status);
  }
}

MainScreen.propTypes = {
  genres: PropTypes.array.isRequired,
  moviePromo: PropTypes.object,
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    posterImage: PropTypes.string,
    previewImage: PropTypes.string,
    genre: PropTypes.string
  })).isRequired,
  moviesLength: PropTypes.number,
  moviesShown: PropTypes.number,
  isPlaying: PropTypes.bool,
  fullVideoShown: PropTypes.bool,
  handlePlayButtonClick: PropTypes.func,
  handleGenreChange: PropTypes.func,
  isAuthorizationRequired: PropTypes.bool,
  handleMoreButtonClick: PropTypes.func,
  handleFavouriteStatusChange: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

const mapStateToProps = (state) => ({
  moviePromo: getPromoFilm(state)
});

export {MainScreen};
export default connect(mapStateToProps)(withRouter(withFullVideoPlayer(MainScreen)));
