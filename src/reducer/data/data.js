import {constants} from '../../constants.js';

const initialState = {
  moviesList: [],
  moviesLength: null,
  moviesShown: constants.LIMIT_QUANTITY,
  activeGenre: constants.DEFAULT_GENRE,
  activeTab: constants.DEFAULT_TAB
};

const ACTION_TYPE = {
  loadFilms: `LOAD_FILMS`,
  changeFilterGenre: `CHANGE_FILTER_GENRE`,
  getRestFilms: `GET_REST_FILMS`
};

const ActionCreators = {
  loadFilms: (films) => {
    return {
      type: ACTION_TYPE.loadFilms,
      payload: films
    };
  },

  changeGenre: (genre) => {
    return {
      type: ACTION_TYPE.changeFilterGenre,
      payload: genre
    };
  },

  getRestFilms: (count) => {
    return {
      type: ACTION_TYPE.getRestFilms,
      payload: count
    };
  }
};

const Operation = {
  loadFilms: () => (dispatch, _getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreators.loadFilms(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.loadFilms: return Object.assign({}, state, {
      moviesList: action.payload,
      moviesLength: action.payload.length
    });

    case ACTION_TYPE.changeFilterGenre: return Object.assign({}, state, {
      activeGenre: action.payload
    });

    case ACTION_TYPE.getRestFilms: return Object.assign({}, state, {
      moviesShown: action.payload
    });
  }

  return state;
};

export {reducer, ACTION_TYPE, Operation, ActionCreators};
