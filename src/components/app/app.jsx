import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreators} from '../../reducer/data/data.js';
import {getFilteredFilms, getGenre, getGenres} from '../../reducer/data/selectors.js';
import MainScreen from '../main-screen/main-screen.jsx';

class App extends PureComponent {
  render() {
    const {moviesList, onGenreChange, genres} = this.props;

    return <MainScreen
      genres={genres}
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
  onGenreChange: PropTypes.func,
  genres: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  moviesList: getFilteredFilms(state),
  activeGenre: getGenre(state),
  genres: getGenres(state)
});

const mapDispatchToProps = (dispatch) => ({
  onGenreChange: (genre) => {
    dispatch(ActionCreators.changeGenre(genre));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
