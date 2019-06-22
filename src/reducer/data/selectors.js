import {constants} from '../../constants.js';
import {createSelector} from "reselect";
import NameSpace from "../name-spaces.js";

const NAME_SPACE = NameSpace.DATA;

export const getFilms = (state) => {
  return state[NAME_SPACE].moviesList;
};

export const getFilmsLength = (state) => {
  return state[NAME_SPACE].moviesLength;
};

export const getFilmsQuantity = (state) => {
  return state[NAME_SPACE].moviesShown;
};

export const getGenre = (state) => {
  return state[NAME_SPACE].activeGenre;
};

export const getFilteredFilms = createSelector(
    getFilms,
    getGenre,
    (moviesList, activeGenre) => moviesList.filter((movie) => {
      if (activeGenre !== constants.DEFAULT_GENRE) {
        return movie.genre === activeGenre;
      }

      return true;
    })
);

export const getGenres = createSelector(
    getFilms,
    (moviesList) => {
      return [constants.DEFAULT_GENRE, ...new Set(moviesList.map((movie) => movie.genre))];
    }
);

export const getFilmId = (state, id) => {
  return state[NAME_SPACE].moviesList.find((film) => film.id === parseInt(id, 10));
};

export const getFilmsAlike = createSelector(
    getFilms,
    getFilmId,
    (moviesList, movie) => moviesList.filter((film) => {
      return film.genre === movie.genre && film.id !== movie.id;
    })
);
