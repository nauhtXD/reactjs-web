/*
 *
 * Admin reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loadingUsers: false,
  users: [],
};

/* eslint-disable default-case, no-param-reassign */
const adminReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_USER:
        draft.loadingUsers = true;
        break;
      case types.GET_USER_SUCCESS:
        draft.users = action.users;
        draft.loadingUsers = false;
        break;
      case types.GET_USER_FAIL:
        draft.users = [];
        draft.loadingUsers = false;
        break;
    }
  });

export default adminReducer;
