// import {createSelector} from "reselect";
import NameSpace from "../name-spaces.js";

const NAME_SPACE = NameSpace.DATA;

export const getFilms = (state) => {
  return state[NAME_SPACE].moviesList;
};
