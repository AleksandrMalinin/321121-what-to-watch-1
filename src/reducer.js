import {films} from './mocks/films.js';
import {constants} from './constants.js';

const initialState = {
  moviesList: films,
  activeGenre: constants.DEFAULT_GENRE
};

const ActionCreators = {
  changeGenre: (genre) => {
    return {
      type: constants.ACTION_TYPE.changeFilterGenre,
      payload: genre
    };
  },

  getMoviesList: (genre) => {
    let movies = genre === initialState.activeGenre ? initialState.moviesList.slice(1) : initialState.moviesList.filter((film) => genre === film.genre);

    return {
      type: constants.ACTION_TYPE.getMoviesList,
      payload: movies
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ACTION_TYPE.changeFilterGenre: return Object.assign({}, state, {
      activeGenre: action.payload
    });

    case constants.ACTION_TYPE.getMoviesList: return Object.assign({}, state, {
      moviesList: action.payload
    });
  }

  return state;
};

export {reducer, ActionCreators};
