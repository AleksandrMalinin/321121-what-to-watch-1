import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getUser} from '../../reducer/user/selectors.js';

const withPrivateRoutes = (Component) => {
  class WithPrivateRoutes extends PureComponent {
    render() {
      if (this.props.user === null) {
        return <Redirect to="/login" />;
      }

      return <Component {...this.props}/>;
    }
  }

  WithPrivateRoutes.propTypes = {
    user: PropTypes.array
  };

  const mapStateToProps = (state) => ({
    user: getUser(state)
  });

  return connect(mapStateToProps)(WithPrivateRoutes);
};

export default withPrivateRoutes;
