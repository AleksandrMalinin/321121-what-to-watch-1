import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';

const withPrivateRoute = (Component) => {
  const WithPrivateRoute = (props) => {
    const {isAuthorizationRequired} = props;

    if (isAuthorizationRequired) {
      return <Redirect to="/login"/>;
    }

    return <Component {...props}/>;
  };

  WithPrivateRoute.propTypes = {
    isAuthorizationRequired: PropTypes.bool,
    isLoading: PropTypes.bool
  };

  const mapStateToProps = (state) => ({
    isAuthorizationRequired: getAuthorizationStatus(state)
  });

  return connect(mapStateToProps)(WithPrivateRoute);
};

export default withPrivateRoute;
