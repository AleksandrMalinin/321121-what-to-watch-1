import {films} from './mocks/films.js';

const initialState = {
  moviesList: films,
  activeGenre: `All genres`
};

const ActionCreators = {
  'CHANGE_FILTER_GENRE': (genre) => {
    return {
      type: `CHANGE_FILTER_GENRE`,
      payload: genre
    };
  },

  'GET_MOVIES_LIST': (genre) => {
    let movies = [];

    if (genre === initialState.activeGenre) {
      movies = initialState.moviesList;
    } else {
      initialState.moviesList.forEach((film) => {
        if (genre === film.genre) {
          movies.push(film);
        }
      });
    }

    return {
      type: `GET_MOVIES_LIST`,
      payload: movies
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_FILTER_GENRE`: return Object.assign({}, state, {
      activeGenre: action.payload
    });

    case `GET_MOVIES_LIST`: return Object.assign({}, state, {
      moviesList: action.payload
    });
  }

  return state;
};

export {reducer, ActionCreators};
