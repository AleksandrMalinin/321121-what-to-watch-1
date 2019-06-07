import {constants} from '../../constants.js';

const initialState = {
  moviesList: [],
  activeGenre: constants.DEFAULT_GENRE
};

const ACTION_TYPE = {
  loadFilms: `LOAD_FILMS`,
  changeFilterGenre: `CHANGE_FILTER_GENRE`
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
    });

    case ACTION_TYPE.changeFilterGenre: return Object.assign({}, state, {
      activeGenre: action.payload
    });
  }

  return state;
};

export {reducer, Operation, ActionCreators};
