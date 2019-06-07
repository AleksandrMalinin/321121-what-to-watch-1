import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
  }

  render() {
    const {poster, link, isMuted = true, format = `video/mp4`} = this.props;

    return <video className="small-movie-card__image" width="280" height="175"
      poster={poster}
      muted={isMuted}
      ref={this._videoRef}
    >
      <source
        src={link}
        type={format}
      />
    </video>;
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      video.play();
    } else {
      video.load();
    }
  }
}

VideoPlayer.propTypes = {
  poster: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isMuted: PropTypes.bool,
  format: PropTypes.string
};

export default VideoPlayer;
