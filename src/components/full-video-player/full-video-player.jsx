import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {getElapsedTime} from '../../utils.js';
import withPlayerDevice from '../../hocs/with-player-device/with-player-device.js';

class FullVideoPlayer extends PureComponent {
  render() {
    const {
      movie,
      format = `video/mp4`,
      isPlaying,
      progress,
      togglerPosition,
      seconds,
      time,
      videoRef,
      handlePlayButtonClick,
      handleControlButtonClick,
      handleFullModeButtonClick,
    } = this.props;

    return <div className="player">
      <video className="player__video" poster={movie.background_image} ref={videoRef}>
        <source
          src={movie.video_link}
          type={format}
        />
      </video>

      <button type="button" className="player__exit" onClick={handlePlayButtonClick}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{left: togglerPosition + `%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getElapsedTime(time - seconds)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handleControlButtonClick}>
            {!isPlaying ?
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

          <button type="button" className="player__full-screen" onClick={handleFullModeButtonClick}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>;
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
  isPlaying: PropTypes.bool,
  format: PropTypes.string,
  progress: PropTypes.number,
  togglerPosition: PropTypes.number,
  seconds: PropTypes.number,
  time: PropTypes.number,
  interval: PropTypes.number,
  videoRef: PropTypes.object,
  handlePlayButtonClick: PropTypes.func,
  handleControlButtonClick: PropTypes.func,
  handleFullModeButtonClick: PropTypes.func
};

export default withPlayerDevice(FullVideoPlayer);
