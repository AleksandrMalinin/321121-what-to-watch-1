const initialState = {
  isAuthorizationRequired: true
};

const ACTION_TYPE = {
  requiredAuthorization: `REQUIRED_AUTHORIZATION`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ACTION_TYPE.requiredAuthorization,
      payload: status,
    };
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.requireAuthorization:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
  }

  return state;
};

export {reducer, ACTION_TYPE, ActionCreator};
