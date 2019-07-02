import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withFullVideoPlayer = (Component) => {
  class WithFullVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false
      };

      this.handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        isPlaying={this.state.isPlaying}
        handlePlayButtonClick={this.handlePlayButtonClick}
      />;
    }

    _handlePlayButtonClick() {
      this.props.handlePlayButtonClick(!this.props.fullVideoShown);

      this.setState({
        isPlaying: !this.state.isPlaying,
      });
    }
  }

  WithFullVideoPlayer.propTypes = {
    movie: PropTypes.shape({
      name: PropTypes.string,
      /* eslint-disable */
      background_image: PropTypes.string,
      preview_video_link: PropTypes.string,
      video_link: PropTypes.string
      /* eslint-enable */
    }),
    isPlaying: PropTypes.bool,
    fullVideoShown: PropTypes.bool,
    handlePlayButtonClick: PropTypes.func
  };

  return WithFullVideoPlayer;
};

export default withFullVideoPlayer;
