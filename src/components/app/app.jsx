import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route} from "react-router-dom";
import {Operation as DataOperation, ActionCreators} from '../../reducer/data/data.js';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import {getFilteredFilms, getGenre, getGenres, getFilmsLength, getFilmsQuantity, getFullVideoState} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import MainScreen from '../main-screen/main-screen.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import MyList from '../my-list/my-list.jsx';
import MovieDetails from '../movie-details/movie-details.jsx';
import AddReview from '../add-review/add-review.jsx';

class App extends PureComponent {
  render() {
    const {
      moviesList,
      moviesLength,
      moviesShown,
      onGenreChange,
      genres,
      onMoreButtonClick,
      fullVideoShown,
      onPlayButtonClick,
      onChangeFavouriteStatus
    } = this.props;

    return <Switch>
      <Route path="/" exact render={() => <MainScreen
        genres={genres}
        moviesList={moviesList}
        moviesLength={moviesLength}
        moviesShown={moviesShown}
        onGenreChange={onGenreChange}
        isAuthorizationRequired={this.props.isAuthorizationRequired}
        onMoreButtonClick={onMoreButtonClick}
        fullVideoShown={fullVideoShown}
        onPlayButtonClick={onPlayButtonClick}
        onChangeFavouriteStatus={onChangeFavouriteStatus}
      />}/>
      <Route path="/login" exact render={() => <SignIn
        onSubmit={this.props.onSubmit}/>
      }/>
      <Route path="/mylist" exact component={MyList}/>
      <Route path="/film/:id" exact render={(props) => <MovieDetails
        {...props}
        moviesShown={moviesShown}
        fullVideoShown={fullVideoShown}
        onPlayButtonClick={onPlayButtonClick}
        onChangeFavouriteStatus={onChangeFavouriteStatus}/>
      }/>
      <Route path="/reviews/add/:id" exact render={(props) => <AddReview {...props}/>}/>
    </Switch>;
  }
}

App.propTypes = {
  moviePromo: PropTypes.object,
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    posterImage: PropTypes.string,
    previewImage: PropTypes.string,
    genre: PropTypes.string
  })).isRequired,
  moviesLength: PropTypes.number,
  moviesShown: PropTypes.number,
  genres: PropTypes.array.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  onGenreChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onMoreButtonClick: PropTypes.func,
  fullVideoShown: PropTypes.bool,
  onPlayButtonClick: PropTypes.func,
  onChangeFavouriteStatus: PropTypes.func,
};

const mapStateToProps = (state) => ({
  moviesList: getFilteredFilms(state),
  moviesLength: getFilmsLength(state),
  moviesShown: getFilmsQuantity(state),
  activeGenre: getGenre(state),
  genres: getGenres(state),
  isAuthorizationRequired: getAuthorizationStatus(state),
  fullVideoShown: getFullVideoState(state)
});

const mapDispatchToProps = (dispatch) => ({
  onGenreChange: (genre) => {
    dispatch(ActionCreators.changeGenre(genre));
  },

  onSubmit: (email, password) => {
    dispatch(UserOperation.loginUser(email, password));
  },

  onMoreButtonClick: (count) => {
    dispatch(ActionCreators.getRestFilms(count));
  },

  onPlayButtonClick: (state) => {
    dispatch(ActionCreators.changeFullVideoState(state));
  },

  onChangeFavouriteStatus: (id, status) => {
    dispatch(DataOperation.changeFavouriteStatus(id, status));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
