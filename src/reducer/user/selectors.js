import NameSpace from "../name-spaces.js";

const NAME_SPACE = NameSpace.USER;

export const getGenre = (state) => {
  return state[NAME_SPACE].activeGenre;
};
