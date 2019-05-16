import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this.onMouseEnter = () => {
      props.onMouseEnter(props.movie);
    };

    this.onPlayClick = () => {
      props.onPlayClick(props.movie);
    };
  }


  render() {
    const {movie, onClick} = this.props;

    return <article className="small-movie-card catalog__movies-card" onMouseEnter={this.onMouseEnter}>
      <button className="small-movie-card__play-btn" type="button" onClick={this.onPlayClick}>Play</button>
      <div className="small-movie-card__image">
        <img src={movie.src} alt={movie.title} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html" onClick={onClick}>{movie.title}</a>
      </h3>
    </article>;
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    src: PropTypes.string.isRequired
  }),
  onClick: PropTypes.func,
  onPlayClick: PropTypes.func,
  onMouseEnter: PropTypes.func
};

export default MovieCard;
