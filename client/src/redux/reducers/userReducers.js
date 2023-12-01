import { LOGIN, LOGOUT, SET_ACCESS, EDIT_USER } from "../actions/constants";

const initialState = {
  user: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.data.user,
        token: action.data.token,
      };
    case LOGOUT:
      return { ...state, user: null, token: null };

    case EDIT_USER:
      return { ...state, user: action.data.user };

    default:
      return state;
  }
};
