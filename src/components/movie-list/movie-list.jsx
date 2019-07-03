import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';

const MovieList = (props) => {
  const {movies, handleChange} = props;
  let moviesCut;

  if (movies) {
    moviesCut = movies.slice(0, props.moviesShown);
  }

  return <div className="catalog__movies-list">
    {moviesCut ? moviesCut.map((movie) => <MovieCard
      movie={movie}
      key={movie.name}
      handleMouseEnter={handleChange}
      handleMouseLeave={handleChange}
    />
    ) :
      ``}
  </div>;
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string
  })),
  moviesShown: PropTypes.number,
  handleChange: PropTypes.func
};

export default withActiveItem(null)(MovieList);
