import produce from 'immer';
import * as types from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const forumPostReducer = (state = initialState, action) =>
  produce(state, draft => {
    const { data, error } = action;
    switch (action.type) {
      case types.DEFAULT_REQUEST:
        break;
      case types.DEFAULT_SUCCESS:
        break;
      case types.DEFAULT_FAILURE:
        break;
    }
  });

export default forumPostReducer;
