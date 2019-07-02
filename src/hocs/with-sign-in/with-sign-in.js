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

      this.onSubmit = this._onSubmit.bind(this);
      this.onEmailChange = this._onEmailChange.bind(this);
      this.onPasswordChange = this._onPasswordChange.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        error={this.state.error}
        onSubmit={this.onSubmit}
        onEmailChange={this.onEmailChange}
        onPasswordChange={this.onPasswordChange}
      />;
    }

    _onSubmit(evt) {
      evt.preventDefault();

      const {email, password} = this.state;

      if (email && password) {
        this.props.onSubmit(email, password)
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

    _onEmailChange(evt) {
      const target = evt.target;

      if (evt) {
        this.setState({
          email: target.value,
        });
      }
    }

    _onPasswordChange(evt) {
      const target = evt.target;

      if (evt) {
        this.setState({
          password: target.value,
        });
      }
    }
  }

  WithSignIn.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  };

  const mapDispatchToProps = (dispatch) => ({
    onSubmit: (email, password) => {
      return dispatch(Operation.loginUser(email, password));
    }
  });

  return connect(undefined, mapDispatchToProps)(WithSignIn);
};

export default withSignIn;
