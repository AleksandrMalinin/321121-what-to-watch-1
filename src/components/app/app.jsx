import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreators} from '../../reducer/user/user.js';
import {getGenre} from '../../reducer/user/selectors.js';
import {getFilms} from '../../reducer/data/selectors.js';
import MainScreen from '../main-screen/main-screen.jsx';

class App extends PureComponent {
  render() {
    const {moviesList, onGenreChange} = this.props;
    const genresList = [...new Set(moviesList.map((movie) => movie.genre))];
    genresList.unshift(`All genres`);

    return <MainScreen
      genres={genresList}
      moviesList={moviesList}
      onGenreChange={onGenreChange}
    />;
  }
}

App.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    posterImage: PropTypes.string,
    previewImage: PropTypes.string,
    genre: PropTypes.string
  })).isRequired,
  onGenreChange: PropTypes.func
};

const mapStateToProps = (state) => ({
  moviesList: getFilms(state),
  activeGenre: getGenre(state)
});

const mapDispatchToProps = (dispatch) => ({
  onGenreChange: (genre) => {
    dispatch(ActionCreators.changeGenre(genre));
    // dispatch(ActionCreators.getMoviesList(genre));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
