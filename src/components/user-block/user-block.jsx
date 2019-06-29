import React, {PureComponent} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';

class UserBlock extends PureComponent {
  render() {
    const {isAuthorizationRequired} = this.props;

    return <div className="user-block">
      {!isAuthorizationRequired ?
        <div className="user-block__avatar">
          {/* временно */}
          <Link to="/mylist">
            <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </Link>
        </div> :
        <Link className="user-block__link" to="/login">Sign in</Link>
      }
    </div>;
  }
}

UserBlock.propTypes = {
  isAuthorizationRequired: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthorizationRequired: getAuthorizationStatus(state)
});

export {UserBlock};
export default connect(mapStateToProps)(UserBlock);
