import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {getElapsedTime} from '../../utils.js';

const MAX_PROGRESS = 100;
const SEC = 1;

class FullVideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      progress: 0,
      togglerPosition: 0,
      seconds: 0,
      time: 0,
      interval: null
    };

    this._videoRef = React.createRef();
    this.onControlButtonClick = this._onControlButtonClick.bind(this);
    this.onFullModeButtonClick = this._onFullModeButtonClick.bind(this);
  }

  render() {
    const {movie, onPlayButtonClick, format = `video/mp4`} = this.props;

    return <div className="player">
      <video className="player__video" poster={movie.background_image} ref={this._videoRef}>
        <source
          src={movie.video_link}
          type={format}
        />
      </video>

      <button type="button" className="player__exit" onClick={onPlayButtonClick}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={this.state.progress} max="100"></progress>
            <div className="player__toggler" style={{left: this.state.togglerPosition + `%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getElapsedTime(this.state.time - this.state.seconds)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={this.onControlButtonClick}>
            {!this.state.isPlaying ?
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg> :

              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"></use>
              </svg>
            }
            <span>{!this.props.isPlaying ? `Play` : `Pause`}</span>
          </button>
          <div className="player__name">{movie.name}</div>

          <button type="button" className="player__full-screen" onClick={this.onFullModeButtonClick}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>;
  }

  componentDidMount() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      video.play();
    }

    if (video) {
      video.addEventListener(`loadedmetadata`, () => {
        this.setState({
          time: video.duration
        });
      });
    }

    this.setState({
      isPlaying: this.props.isPlaying
    });

    this.runPlayer();
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.state.progress === MAX_PROGRESS) {
      video.load();
      this.stopPlayer();
    }
  }

  _onControlButtonClick() {
    const video = this._videoRef.current;

    this.setState({
      isPlaying: !this.state.isPlaying
    });

    if (!this.state.isPlaying) {
      video.play();
      this.runPlayer();
    } else {
      video.pause();
      this.stopPlayer();
    }
  }

  _onFullModeButtonClick() {
    const video = this._videoRef.current;

    video.requestFullscreen();
  }

  runPlayer() {
    const intervalId = setInterval(() =>
      this.setState({
        seconds: this.state.seconds + SEC,
        progress: this.state.progress + MAX_PROGRESS / this.state.time,
        togglerPosition: this.state.togglerPosition + MAX_PROGRESS / this.state.time
      }), 1000);

    this.setState({
      interval: intervalId
    });
  }

  stopPlayer() {
    clearInterval(this.state.interval);

    if (this.state.progress === MAX_PROGRESS && this.state.isPlaying) {
      this.setState({
        isPlaying: false,
        progress: 0,
        togglerPosition: 0,
        seconds: 0,
        time: null
      });
    }
  }
}

FullVideoPlayer.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string,
    /* eslint-disable */
    background_image: PropTypes.string,
    preview_video_link: PropTypes.string,
    video_link: PropTypes.string
    /* eslint-enable */
  }),
  onPlayButtonClick: PropTypes.func,
  isPlaying: PropTypes.bool,
  format: PropTypes.string
};

export default FullVideoPlayer;
