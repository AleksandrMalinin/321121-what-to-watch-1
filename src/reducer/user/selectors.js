import NameSpace from "../name-spaces.js";

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].isAuthorizationRequired;
};

export const getUser = (state) => {
  return state[NAME_SPACE].user;
};

export const getComments = (state) => {
  return state[NAME_SPACE].comments;
};

export const isDataLoading = (state) => {
  return state[NAME_SPACE].isLoading;
};
