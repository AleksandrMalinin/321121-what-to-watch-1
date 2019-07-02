import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreators, Operation} from '../../reducer/data/data.js';
import {getFavouriteFilms} from '../../reducer/data/selectors.js';
import withPrivateRoute from '../../hocs/with-private-route/with-private-route.js';
import Sprite from '../sprite/sprite.jsx';
import Logo from '../logo/logo.jsx';
import UserBlock from '../user-block/user-block.jsx';
import MovieList from '../movie-list/movie-list.jsx';

class MyList extends PureComponent {
  render() {
    const {moviesFavourite, handleGenreChange} = this.props;

    return <React.Fragment>
      <Sprite/>

      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo/>
          <UserBlock/>
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <MovieList
            movies={moviesFavourite}
            handleChange={handleGenreChange}
          />

        </section>
        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
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
    </React.Fragment>;
  }

  componentDidMount() {
    this.props.handleFavouriteFilmsLoad();
  }
}

MyList.propTypes = {
  moviesFavourite: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    posterImage: PropTypes.string,
    previewImage: PropTypes.string,
    genre: PropTypes.string
  })).isRequired,
  handleGenreChange: PropTypes.func,
  handleFavouriteFilmsLoad: PropTypes.func
};

const mapStateToProps = (state) => ({
  moviesFavourite: getFavouriteFilms(state)
});

const mapDispatchToProps = (dispatch) => ({
  handleGenreChange: (genre) => {
    dispatch(ActionCreators.changeGenre(genre));
  },

  handleFavouriteFilmsLoad: () => {
    dispatch(Operation.loadFavouriteFilms());
  }
});

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(withPrivateRoute(MyList));
