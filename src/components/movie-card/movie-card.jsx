import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
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
        poster={movie.preview_image}
        link={movie.preview_video_link}
        isPlaying={this.state.isPlaying}
      />
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={`/film/${movie.id}`} onClick={onClick}>{movie.name}</Link>
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
    this.props.onMouseLeave(null);

    clearTimeout(this.state.timeoutId);

    this.setState({
      isPlaying: !this.state.isPlaying,
      timeoutId: null
    });
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeoutId);
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string,
    /* eslint-disable */
    preview_image: PropTypes.string.isRequired,
    preview_video_link: PropTypes.string.isRequired
    /* eslint-enable */
  }),
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

export default MovieCard;
