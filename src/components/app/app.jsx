import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route} from "react-router-dom";
import {Operation, ActionCreators} from '../../reducer/data/data.js';
import {getFilteredFilms, getGenre, getGenres, getFilmsLength, getFilmsQuantity, getFullVideoState} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import MainScreen from '../main-screen/main-screen.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import MyList from '../my-list/my-list.jsx';
import MovieDetails from '../movie-details/movie-details.jsx';
import AddReview from '../add-review/add-review.jsx';

const App = (props) => {
  const {
    moviesList,
    moviesLength,
    moviesShown,
    handleGenreChange,
    genres,
    handleMoreButtonClick,
    fullVideoShown,
    handlePlayButtonClick,
    handleFavouriteStatusChange
  } = props;

  return <Switch>
    <Route path="/" exact render={() => <MainScreen
      genres={genres}
      moviesList={moviesList}
      moviesLength={moviesLength}
      moviesShown={moviesShown}
      handleGenreChange={handleGenreChange}
      isAuthorizationRequired={props.isAuthorizationRequired}
      handleMoreButtonClick={handleMoreButtonClick}
      fullVideoShown={fullVideoShown}
      handlePlayButtonClick={handlePlayButtonClick}
      handleFavouriteStatusChange={handleFavouriteStatusChange}
    />}/>
    <Route path="/login" exact component={SignIn}/>
    <Route path="/mylist" exact component={MyList}/>
    <Route path="/film/:id" exact render={(params) => <MovieDetails
      {...params}
      moviesShown={moviesShown}
      fullVideoShown={fullVideoShown}
      handlePlayButtonClick={handlePlayButtonClick}
      handleFavouriteStatusChange={handleFavouriteStatusChange}/>
    }/>
    <Route path="/reviews/add/:id" exact render={() => <AddReview {...props}/>}/>
  </Switch>;
};

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
  handleGenreChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleMoreButtonClick: PropTypes.func,
  fullVideoShown: PropTypes.bool,
  handlePlayButtonClick: PropTypes.func,
  handleFavouriteStatusChange: PropTypes.func,
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
  handleGenreChange: (genre) => {
    dispatch(ActionCreators.changeGenre(genre));
  },

  handleMoreButtonClick: (count) => {
    dispatch(ActionCreators.getRestFilms(count));
  },

  handlePlayButtonClick: (state) => {
    dispatch(ActionCreators.changeFullVideoState(state));
  },

  handleFavouriteStatusChange: (id, status) => {
    dispatch(Operation.changeFavouriteStatus(id, status));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
