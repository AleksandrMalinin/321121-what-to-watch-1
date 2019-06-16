import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, withRouter} from "react-router-dom";
import {ActionCreators} from '../../reducer/data/data.js';
import {Operation} from '../../reducer/user/user.js';
import {getFilteredFilms, getGenre, getGenres} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import MainScreen from '../main-screen/main-screen.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import MyList from '../my-list/my-list.jsx';
import withPrivateRoutes from '../../hocs/with-private-route/with-private-route.js';

const WrappedSignIn = withRouter(SignIn);

class App extends PureComponent {
  render() {
    const {moviesList, onGenreChange, genres} = this.props;

    return <Switch>
      <Route path="/" exact render={() => <MainScreen
        genres={genres}
        moviesList={moviesList}
        onGenreChange={onGenreChange}
        isAuthorizationRequired={this.props.isAuthorizationRequired}
      />}/>
      <Route path="/login" exact render={() => <WrappedSignIn onSubmit={this.props.onSubmit}/>}/>
      <Route path="/favourites" exact component={withPrivateRoutes(MyList)}/>
    </Switch>;
  }
}

App.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    posterImage: PropTypes.string,
    previewImage: PropTypes.string,
    genre: PropTypes.string
  })).isRequired,
  genres: PropTypes.array.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  onGenreChange: PropTypes.func,
  onSubmit: PropTypes.func
};

const mapStateToProps = (state) => ({
  moviesList: getFilteredFilms(state),
  activeGenre: getGenre(state),
  genres: getGenres(state),
  isAuthorizationRequired: getAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  onGenreChange: (genre) => {
    dispatch(ActionCreators.changeGenre(genre));
  },

  onSubmit: (email, password) => {
    dispatch(Operation.loginUser(email, password));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
