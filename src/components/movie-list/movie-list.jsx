import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card.jsx';

class MovieList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovieCard: null
    };
  }

  render() {
    const {movies} = this.props;
    const onMouseEnter = (movie) => this.setState({
      activeMovieCard: movie
    });

    const onPlayClick = (movie) => this.setState({
      activeMovieCard: movie
    });

    return <div className="catalog__movies-list">
      {movies.map((movie) => <MovieCard
        movie={movie}
        key={movie.title}
        onMouseEnter={onMouseEnter}
        onPlayClick={onPlayClick}
      />)}
    </div>;
  }

}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    src: PropTypes.string.isRequired,
  })).isRequired
};

export default MovieList;
