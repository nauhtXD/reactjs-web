import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loadingLoginToken: false,
  loginToken: [],
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_LOGIN_TOKEN:
        draft.loadingLoginToken = true;
        break;
      case types.GET_LOGIN_TOKEN_SUCCESS:
        draft.loginToken = action.loginToken;
        draft.loadingLoginToken = false;
        break;
      case types.GET_LOGIN_TOKEN_FAIL:
        draft.loginToken = [];
        draft.loadingLoginToken = false;
        break;
    }
  });

export default loginReducer;
