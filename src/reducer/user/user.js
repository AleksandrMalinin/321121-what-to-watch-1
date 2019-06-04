import {constants} from '../../constants.js';

const initialState = {
  activeGenre: constants.DEFAULT_GENRE
};

const ACTION_TYPE = {
  changeFilterGenre: `CHANGE_FILTER_GENRE`
};

const ActionCreators = {
  changeGenre: (genre) => {
    return {
      type: ACTION_TYPE.changeFilterGenre,
      payload: genre
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.changeFilterGenre: return Object.assign({}, state, {
      activeGenre: action.payload
    });
  }

  return state;
};

export {reducer, ActionCreators};
