import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card.jsx';

class MovieList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovieCard: null
    };

    this.onMouseEnter = (movie) => this.setState({
      activeMovieCard: movie
    });

    this.onPlayClick = (movie) => this.setState({
      activeMovieCard: movie
    });
  }

  render() {
    const {movies} = this.props;

    return <div className="catalog__movies-list">
      {movies.map((movie) => <MovieCard
        movie={movie}
        key={movie.title}
        onMouseEnter={this.onMouseEnter}
        onPlayClick={this.onPlayClick}
      />)}
    </div>;
  }

}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string
  })).isRequired
};

export default MovieList;
