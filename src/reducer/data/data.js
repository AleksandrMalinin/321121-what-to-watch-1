import {constants} from '../../constants.js';
import {changeFavouriteStatus} from '../../utils.js';

const initialState = {
  moviePromo: null,
  moviesList: [],
  moviesFavourite: [],
  moviesLength: null,
  moviesShown: constants.LIMIT_QUANTITY,
  activeGenre: constants.DEFAULT_GENRE,
  activeTab: constants.DEFAULT_TAB,
  fullVideoShown: false
};

const ACTION_TYPE = {
  loadPromoFilm: `LOAD_PROMO_FILM`,
  loadFilms: `LOAD_FILMS`,
  loadFavouriteFilms: `LOAD_FAVOURITE_FILMS`,
  changeFilterGenre: `CHANGE_FILTER_GENRE`,
  getRestFilms: `GET_REST_FILMS`,
  changeFullVideoState: `CHANFE_FULL_VIDEO_STATE`,
  changeFavouriteStatus: `CHANGE_FAVOURITE_STATUS`
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

  loadFavouriteFilms: (films) => {
    return {
      type: ACTION_TYPE.loadFavouriteFilms,
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
  },

  changeFavouriteStatus: (film) => {
    return {
      type: ACTION_TYPE.changeFavouriteStatus,
      payload: film
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

  loadFavouriteFilms: () => (dispatch, _getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreators.loadFavouriteFilms(response.data));
      });
  },

  changeFavouriteStatus: (id, status) => (dispatch, _getState, api) => {
    return api.post(`/favorite/${id}/${status ? 0 : 1}`, {id, status})
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreators.changeFavouriteStatus(response.data));
        }
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.loadFilms: return Object.assign({}, state, {
      moviesList: action.payload,
      moviesLength: action.payload.length
    });

    case ACTION_TYPE.loadPromoFilm: return Object.assign({}, state, {
      moviePromo: action.payload
    });

    case ACTION_TYPE.loadFavouriteFilms: return Object.assign({}, state, {
      moviesFavourite: action.payload
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

    case ACTION_TYPE.changeFavouriteStatus:
      const movieListUpdated = changeFavouriteStatus(state, action.payload);

      return Object.assign({}, state, {
        moviesList: [
          ...movieListUpdated,
          ...[action.payload]
        ]
      });
  }

  return state;
};

export {reducer, ACTION_TYPE, Operation, ActionCreators};
