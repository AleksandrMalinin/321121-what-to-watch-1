const initialState = {
  isAuthorizationRequired: true,
  user: null
};

const ACTION_TYPE = {
  setAuthorizationStatus: `REQUIRED_AUTHORIZATION`,
  loginUser: `LOGIN_USER`,
  authorizeUser: `AUTHORIZE_USER`
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
  }

  return state;
};

export {reducer, ACTION_TYPE, Operation, ActionCreator};
