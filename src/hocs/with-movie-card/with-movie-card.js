import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {constants} from '../../constants.js';

const withMovieCard = (Component) => {
  class WithMovieCard extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
        timeoutId: null
      };

      this.handleMouseEnter = this._handleMouseEnter.bind(this);
      this.handleMouseLeave = this._handleMouseLeave.bind(this);
    }

    componentWillUnmount() {
      clearTimeout(this.state.timeoutId);
    }

    render() {
      return <Component
        {...this.props}
        isPlaying={this.state.isPlaying}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />;
    }

    _handleMouseEnter() {
      this.props.onMouseEnter(this.props.movie);

      const id = setTimeout(() => {
        this.setState({
          isPlaying: true,
        });
      }, constants.TIMEOUT);

      this.setState({
        timeoutId: id
      });
    }

    _handleMouseLeave() {
      this.props.onMouseLeave(null);

      clearTimeout(this.state.timeoutId);

      this.setState({
        isPlaying: false,
        timeoutId: null
      });
    }
  }

  WithMovieCard.propTypes = {
    movie: PropTypes.shape({
      name: PropTypes.string,
      /* eslint-disable */
      preview_image: PropTypes.string.isRequired,
      preview_video_link: PropTypes.string.isRequired
      /* eslint-enable */
    }),
    activeItem: PropTypes.string,
    onChange: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  };

  return WithMovieCard;
};

export default withMovieCard;
