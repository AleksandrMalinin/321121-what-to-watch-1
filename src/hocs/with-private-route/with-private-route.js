import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getAuthorizationStatus, isDataLoading, getUser} from '../../reducer/user/selectors.js';

const withPrivateRoute = (Component) => {
  const WithPrivateRoute = (props) => {
    const {isAuthorizationRequired, isLoading} = props;

    if (isAuthorizationRequired && !isLoading) {
      return <Redirect to="/login"/>;
    }

    return <Component {...props}/>;
  };

  WithPrivateRoute.propTypes = {
    isAuthorizationRequired: PropTypes.bool,
    isLoading: PropTypes.bool
  };

  const mapStateToProps = (state) => ({
    isAuthorizationRequired: getAuthorizationStatus(state),
    isLoading: isDataLoading(state),
    user: getUser(state)
  });

  return connect(mapStateToProps)(WithPrivateRoute);
};

export default withPrivateRoute;
