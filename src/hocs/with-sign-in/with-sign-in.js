import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withSignIn = (Component) => {
  class WithSignIn extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: null,
        password: null
      };

      this.onSubmit = this.onSubmit.bind(this);
      this.onEmailChange = this.onEmailChange.bind(this);
      this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        onSubmit={this.onSubmit}
        onEmailChange={this.onEmailChange}
        onPasswordChange={this.onPasswordChange}
      />;
    }

    onSubmit(evt) {
      evt.preventDefault();

      const {email, password} = this.state;

      if (email && password) {
        this.props.onSubmit(email, password);
        this.props.history.push(`/`);
      }
    }

    onEmailChange(evt) {
      const target = evt.target;

      if (evt) {
        this.setState({
          email: target.value,
        });
      }
    }

    onPasswordChange(evt) {
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

  return WithSignIn;
};

export default withSignIn;
