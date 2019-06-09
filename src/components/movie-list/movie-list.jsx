import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card.jsx';
import withActiveItem from '../../hocs/with-active-item.js';

class MovieList extends PureComponent {
  render() {
    const {movies, onChange} = this.props;

    return <div className="catalog__movies-list">
      {movies.map((movie) => <MovieCard
        movie={movie}
        key={movie.title}
        onMouseEnter={onChange}
        onMouseLeave={onChange}
      />)}
    </div>;
  }
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string
  })).isRequired,
  onChange: PropTypes.func
};

export default withActiveItem(null)(MovieList);
