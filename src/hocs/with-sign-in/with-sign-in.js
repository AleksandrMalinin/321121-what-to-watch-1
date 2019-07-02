import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Operation} from '../../reducer/user/user.js';

const withSignIn = (Component) => {
  class WithSignIn extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        error: false,
        email: null,
        password: null
      };

      this.handleSubmit = this._handleSubmit.bind(this);
      this.handleEmailChange = this._handleEmailChange.bind(this);
      this.handlePasswordChange = this._handlePasswordChange.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        error={this.state.error}
        handleSubmit={this.handleSubmit}
        handleEmailChange={this.handleEmailChange}
        handlePasswordChange={this.handlePasswordChange}
      />;
    }

    _handleSubmit(evt) {
      evt.preventDefault();

      const {email, password} = this.state;

      if (email && password) {
        this.props.handleSubmit(email, password)
        .then((response) => {
          if (!response.error) {
            this.props.history.push(`/`);
          } else {
            this.setState({
              error: response.error
            });
          }
        });
      }
    }

    _handleEmailChange(evt) {
      const target = evt.target;

      if (evt) {
        this.setState({
          email: target.value,
        });
      }
    }

    _handlePasswordChange(evt) {
      const target = evt.target;

      if (evt) {
        this.setState({
          password: target.value,
        });
      }
    }
  }

  WithSignIn.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  };

  const mapDispatchToProps = (dispatch) => ({
    handleSubmit: (email, password) => {
      return dispatch(Operation.loginUser(email, password));
    }
  });

  return connect(undefined, mapDispatchToProps)(WithSignIn);
};

export default withSignIn;
