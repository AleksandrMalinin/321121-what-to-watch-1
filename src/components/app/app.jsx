import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreators} from '../../reducer.js';
import MainScreen from '../main-screen/main-screen.jsx';

class App extends PureComponent {
  constructor(props) {
    super();

    this.genresList = this.fillGenres(props.moviesList);
  }

  render() {
    const {moviesList, onGenreChange} = this.props;

    return <MainScreen
      genres={this.genresList}
      moviesList={moviesList}
      onGenreChange={onGenreChange}
    />;
  }

  fillGenres(movies) {
    const genresList = movies.map((movie) => movie.genre);
    genresList.unshift(`All genres`);

    return genresList;
  }
}

App.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    poster: PropTypes.string,
    preview: PropTypes.string,
    genre: PropTypes.string
  })).isRequired,
  onGenreChange: PropTypes.func
};

const mapStateToProps = (state) => ({
  moviesList: state.moviesList,
  activeGenre: state.activeGenre
});

const mapDispatchToProps = (dispatch) => ({
  onGenreChange: (genre) => {
    dispatch(ActionCreators.changeGenre(genre));
    dispatch(ActionCreators.getMoviesList(genre));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
