import {constants} from '../../constants.js';

const initialState = {
  moviePromo: null,
  moviesList: [],
  moviesLength: null,
  moviesShown: constants.LIMIT_QUANTITY,
  activeGenre: constants.DEFAULT_GENRE,
  activeTab: constants.DEFAULT_TAB,
  fullVideoShown: false
};

const ACTION_TYPE = {
  loadPromoFilm: `LOAD_PROMO_FILM`,
  loadFilms: `LOAD_FILMS`,
  changeFilterGenre: `CHANGE_FILTER_GENRE`,
  getRestFilms: `GET_REST_FILMS`,
  changeFullVideoState: `CHANFE_FULL_VIDEO_STATE`,
};

const ActionCreators = {
  loadPromoFilm: (film) => {
    return {
      type: ACTION_TYPE.loadPromoFilm,
      payload: film
    };
  },

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
  },

  changeFullVideoState: (state) => {
    return {
      type: ACTION_TYPE.changeFullVideoState,
      payload: state
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

  loadPromoFilm: () => (dispatch, _getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreators.loadPromoFilm(response.data));
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

    case ACTION_TYPE.changeFullVideoState: return Object.assign({}, state, {
      fullVideoShown: action.payload
    });

    case ACTION_TYPE.loadPromoFilm: return Object.assign({}, state, {
      moviePromo: action.payload
    });
  }

  return state;
};

export {reducer, ACTION_TYPE, Operation, ActionCreators};
