import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';

class MovieList extends PureComponent {
  render() {
    const {movies, onChange} = this.props;
    const moviesCut = movies.slice(0, this.props.moviesShown);

    return <div className="catalog__movies-list">
      {moviesCut.map((movie) => <MovieCard
        movie={movie}
        key={movie.name}
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
  moviesShown: PropTypes.number,
  onChange: PropTypes.func
};

export default withActiveItem(null)(MovieList);
