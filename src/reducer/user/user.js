const initialState = {
  isAuthorizationRequired: false,
  user: {}
};

const ACTION_TYPE = {
  requireAuthorization: `REQUIRED_AUTHORIZATION`,
  loginUser: `LOGIN_USER`
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ACTION_TYPE.requireAuthorization,
      payload: status
    };
  },

  authorizeUser: (user) => {
    return {
      type: ACTION_TYPE.loginUser,
      payload: user
    };
  }
};

const Operation = {
  loginUser: (email, password) => (dispatch, _getState, api) => {
    return api.post(`/login`, {email, password})
      .then((response) => {
        dispatch(ActionCreator.authorizeUser(response.data));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.requireAuthorization: return Object.assign({}, state, {
      isAuthorizationRequired: action.payload
    });

    case ACTION_TYPE.loginUser: return Object.assign({}, state, {
      isAuthorizationRequired: true,
      user: action.payload
    });
  }

  return state;
};

export {reducer, ACTION_TYPE, Operation, ActionCreator};
