import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import VideoPlayer from '../video-player/video-player.jsx';
import withMovieCard from '../../hocs/with-movie-card/with-movie-card.js';

const MovieCard = (props) => {
  const {movie, isPlaying, handleClick, handleMouseEnter, handleMouseLeave} = props;

  return <article className="small-movie-card catalog__movies-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    <Link to={`/film/${movie.id}`}>
      <VideoPlayer
        poster={movie.preview_image}
        link={movie.preview_video_link}
        isPlaying={isPlaying}
      />
    </Link>
    <h3 className="small-movie-card__title">
      <Link className="small-movie-card__link" to={`/film/${movie.id}`} onClick={handleClick}>{movie.name}</Link>
    </h3>
  </article>;
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string,
    /* eslint-disable */
    preview_image: PropTypes.string.isRequired,
    preview_video_link: PropTypes.string.isRequired
    /* eslint-enable */
  }),
  isPlaying: PropTypes.bool,
  handleClick: PropTypes.func,
  handleMouseEnter: PropTypes.func,
  handleMouseLeave: PropTypes.func
};

export default withMovieCard(MovieCard);
