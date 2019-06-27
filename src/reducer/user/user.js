const initialState = {
  isAuthorizationRequired: true,
  user: null,
  comments: null
};

const ACTION_TYPE = {
  setAuthorizationStatus: `REQUIRED_AUTHORIZATION`,
  loginUser: `LOGIN_USER`,
  authorizeUser: `AUTHORIZE_USER`,
  addReview: `ADD_REVIEW`
};

const ActionCreator = {
  setAuthorizationStatus: (status) => {
    return {
      type: ACTION_TYPE.setAuthorizationStatus,
      payload: status
    };
  },

  authorizeUser: (user) => {
    return {
      type: ACTION_TYPE.authorizeUser,
      payload: user
    };
  },

  addReview: (comments) => {
    return {
      type: ACTION_TYPE.addReview,
      payload: comments
    };
  }
};

const Operation = {
  loginUser: (email, password) => (dispatch, _getState, api) => {
    return api.post(`/login`, {email, password})
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.setAuthorizationStatus(false));
          dispatch(ActionCreator.authorizeUser(response.data));
        }
      });
  },

  addReview: (id, comment, rating) => (dispatch, _getState, api) => {
    return api.post(`/comments/${id}`, {comment, rating})
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.addReview(response.data));
        }
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.setAuthorizationStatus: return Object.assign({}, state, {
      isAuthorizationRequired: action.payload
    });

    case ACTION_TYPE.authorizeUser: return Object.assign({}, state, {
      user: action.payload
    });

    case ACTION_TYPE.addReview: return Object.assign({}, state, {
      comments: action.payload
    });
  }

  return state;
};

export {reducer, ACTION_TYPE, Operation, ActionCreator};
