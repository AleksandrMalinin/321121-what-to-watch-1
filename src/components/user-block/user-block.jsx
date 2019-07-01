import React, {PureComponent} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAuthorizationStatus, getUser} from '../../reducer/user/selectors.js';
import {constants} from '../../constants.js';

class UserBlock extends PureComponent {
  render() {
    const {isAuthorizationRequired, user} = this.props;

    return <div className="user-block">
      {!isAuthorizationRequired && user ?
        <div className="user-block__avatar">
          <Link to="/mylist">
            <img src={user ? `${constants.URL}${user.avatar_url}` : ``} alt={user ? user.name : ``} width="63" height="63" />
          </Link>
        </div> :
        <Link className="user-block__link" to="/login">Sign in</Link>
      }
    </div>;
  }
}

UserBlock.propTypes = {
  isAuthorizationRequired: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = (state) => ({
  isAuthorizationRequired: getAuthorizationStatus(state),
  user: getUser(state)
});

export {UserBlock};
export default connect(mapStateToProps)(UserBlock);
