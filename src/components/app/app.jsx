import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreators} from '../../reducer.js';
import MainScreen from '../main-screen/main-screen.jsx';

class App extends PureComponent {
  constructor(props) {
    super();

    this.genresList = this.fillGenres(props.moviesList);
    this.state = {
      moviesList: props.moviesList.slice(1)
    };
  }

  render() {
    const {activeGenre, onGenreChange} = this.props;

    return <MainScreen
      genres={this.genresList}
      moviesList={this.state.moviesList}
      activeGenre={activeGenre}
      onGenreChange={onGenreChange}
    />;
  }

  componentDidUpdate() {
    this.setState({
      moviesList: this.props.moviesList
    });
  }

  fillGenres(movies) {
    let genres = movies.map((movie) => movie.genre);
    let genresList = [...new Set(genres)];

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
  activeGenre: PropTypes.string,
  onGenreChange: PropTypes.func
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  moviesList: state.moviesList,
  activeGenre: state.activeGenre
});

const mapDispatchToProps = (dispatch) => ({
  onGenreChange: (evt, genre) => {
    evt.preventDefault();

    dispatch(ActionCreators.changeGenre(genre));
    dispatch(ActionCreators.getMoviesList(genre));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
