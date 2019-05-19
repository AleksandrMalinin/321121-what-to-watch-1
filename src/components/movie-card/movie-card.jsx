import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player.jsx';

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false
    };

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
  }

  render() {
    const {movie, onClick, onMouseEnter = this._onMouseEnter, onMouseLeave = this._onMouseLeave} = this.props;

    return <article className="small-movie-card catalog__movies-card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <VideoPlayer
        poster={movie.poster}
        preview={movie.preview}
        isPlaying={this.state.isPlaying}
      />
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html" onClick={onClick}>{movie.title}</a>
      </h3>
    </article>;
  }

  _onMouseEnter() {
    setTimeout(() => {
      this.setState({
        isPlaying: !this.state.isPlaying
      });
    }, 1000);
  }

  _onMouseLeave() {
    clearTimeout();

    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    poster: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired
  }),
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

export default MovieCard;
