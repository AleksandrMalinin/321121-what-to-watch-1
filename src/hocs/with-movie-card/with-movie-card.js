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

    render() {
      return <Component
        {...this.props}
        isPlaying={this.state.isPlaying}
        handleMouseEnter={this.handleMouseEnter}
        handleMouseLeave={this.handleMouseLeave}
      />;
    }

    _handleMouseEnter() {
      this.props.handleMouseEnter(this.props.movie);

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
      this.props.handleMouseLeave(null);

      clearTimeout(this.state.timeoutId);

      this.setState({
        isPlaying: false,
        timeoutId: null
      });
    }

    componentWillUnmount() {
      clearTimeout(this.state.timeoutId);
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
    handleChange: PropTypes.func,
    handleMouseEnter: PropTypes.func,
    handleMouseLeave: PropTypes.func
  };

  return WithMovieCard;
};

export default withMovieCard;
