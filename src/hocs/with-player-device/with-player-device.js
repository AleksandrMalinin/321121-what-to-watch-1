import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const MAX_PROGRESS = 100;
const SEC = 1;

const withPlayerDevice = (Component) => {
  class WithPlayerDevice extends PureComponent {
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
      this.handleControlButtonClick = this._handleControlButtonClick.bind(this);
      this.handleFullModeButtonClick = this._handleFullModeButtonClick.bind(this);
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

      this._runPlayer();
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (this.state.progress === MAX_PROGRESS) {
        video.load();
        this._stopPlayer();
      }
    }

    render() {
      return <Component
        {...this.props}
        isPlaying={this.state.isPlaying}
        progress={this.state.progress}
        togglerPosition={this.state.togglerPosition}
        seconds={this.state.seconds}
        time={this.state.time}
        videoRef={this._videoRef}
        onControlButtonClick={this.handleControlButtonClick}
        onFullModeButtonClick={this.handleFullModeButtonClick}
      />;
    }

    _handleControlButtonClick() {
      const video = this._videoRef.current;

      this.setState({
        isPlaying: !this.state.isPlaying
      });

      if (!this.state.isPlaying) {
        video.play();
        this._runPlayer();
      } else {
        video.pause();
        this._stopPlayer();
      }
    }

    _handleFullModeButtonClick() {
      const video = this._videoRef.current;

      video.requestFullscreen();
    }

    _runPlayer() {
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

    _stopPlayer() {
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

  WithPlayerDevice.propTypes = {
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
    onPlayButtonClick: PropTypes.func,
    onControlButtonClick: PropTypes.func,
    onFullModeButtonClick: PropTypes.func
  };

  return WithPlayerDevice;
};

export default withPlayerDevice;
