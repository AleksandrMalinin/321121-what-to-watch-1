import React from 'react';
import {Link, withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import Sprite from '../sprite/sprite.jsx';
import Logo from '../logo/logo.jsx';
import withSignIn from '../../hocs/with-sign-in/with-sign-in.js';

const SignIn = (props) => {
  const {error, handleSubmit, handleEmailChange, handlePasswordChange} = props;

  return <React.Fragment>
    <Sprite/>

    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          {
            error ?
              <div className="sign-in__message">
                <p>Something went wrong ¯ \ _ (ツ) _ / ¯</p>
              </div> :
              ``
          }
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" onChange={handleEmailChange} required/>
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" onChange={handlePasswordChange} required/>
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <Link className="logo__link logo__link--light" to="/">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </React.Fragment>;
};

SignIn.propTypes = {
  error: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  handleEmailChange: PropTypes.func,
  handlePasswordChange: PropTypes.func
};

export default withRouter(withSignIn(SignIn));
