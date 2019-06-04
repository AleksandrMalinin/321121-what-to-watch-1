const initialState = {
  moviesList: []
};

const ACTION_TYPE = {
  loadFilms: `LOAD_FILMS`
};

const ActionCreators = {
  loadFilms: (films) => {
    return {
      type: ACTION_TYPE.loadFilms,
      payload: films
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
  }

  return state;
};

export {reducer, Operation, ActionCreators};
