import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player.jsx';

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this.TIMEOUT = 1000;
    this.state = {
      isPlaying: false,
      timeoutId: null
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
    const id = setTimeout(() => {
      this.setState({
        isPlaying: true
      });
    }, this.TIMEOUT);

    this.setState({
      timeoutId: id
    });
  }

  _onMouseLeave() {
    clearTimeout(this.setState.timeoutId);

    this.setState({
      isPlaying: false,
      timeoutId: null
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
