import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';

const withPrivateRoute = (Component) => {
  class WithPrivateRoute extends PureComponent {
    render() {
      if (this.props.isAuthorizationRequired) {
        return <Redirect to="/login"/>;
      }

      return <Component {...this.props}/>;
    }
  }

  WithPrivateRoute.propTypes = {
    isAuthorizationRequired: PropTypes.bool
  };

  const mapStateToProps = (state) => ({
    isAuthorizationRequired: getAuthorizationStatus(state)
  });

  return connect(mapStateToProps)(WithPrivateRoute);
};

export default withPrivateRoute;
