import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player.jsx';
import {constants} from '../../constants.js';

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      timeoutId: null
    };

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
  }

  render() {
    const {movie, onClick} = this.props;

    return <article className="small-movie-card catalog__movies-card" onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave}>
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
    this.props.onMouseEnter(this.props.movie);

    const id = setTimeout(() => {
      this.setState({
        isPlaying: !this.state.isPlaying,
      });
    }, constants.TIMEOUT);

    this.setState({
      timeoutId: id
    });
  }

  _onMouseLeave() {
    this.props.onMouseLeave(this.props.movie);

    clearTimeout(this.setState.timeoutId);

    this.setState({
      isPlaying: !this.state.isPlaying,
      timeoutId: null
    });
  }

  componentWillUnmount() {
    clearTimeout(this.setState.timeoutId);
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
