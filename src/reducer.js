import {films} from './mocks/films.js';
import {constants} from './constants.js';

const ACTION_TYPE = {
  changeFilterGenre: `CHANGE_FILTER_GENRE`,
  getMoviesList: `GET_MOVIES_LIST`
};

const initialState = {
  moviesList: films,
  activeGenre: constants.DEFAULT_GENRE
};

const ActionCreators = {
  changeGenre: (genre) => {
    return {
      type: ACTION_TYPE.changeFilterGenre,
      payload: genre
    };
  },

  getMoviesList: (genre) => {
    const movies = genre === initialState.activeGenre ? initialState.moviesList : initialState.moviesList.filter((film) => genre === film.genre);

    return {
      type: ACTION_TYPE.getMoviesList,
      payload: movies
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.changeFilterGenre: return Object.assign({}, state, {
      activeGenre: action.payload
    });

    case ACTION_TYPE.getMoviesList: return Object.assign({}, state, {
      moviesList: action.payload
    });
  }

  return state;
};

export {reducer, ActionCreators};
