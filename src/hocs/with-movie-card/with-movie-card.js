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

      this.onMouseEnter = this._onMouseEnter.bind(this);
      this.onMouseLeave = this._onMouseLeave.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        isPlaying={this.state.isPlaying}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      />;
    }

    _onMouseEnter() {
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

    _onMouseLeave() {
      this.props.onMouseLeave(null);

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
    onChange: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  };

  return WithMovieCard;
};

export default withMovieCard;
