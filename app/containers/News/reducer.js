import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loadingPost: false,
  post: [],
};

/* eslint-disable default-case, no-param-reassign */
const newsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_POST:
        draft.loadingPost = true;
        break;
      case types.GET_POST_SUCCESS:
        draft.loadingPost = false;
        draft.post = action.post;
        break;
      case types.GET_POST_FAIL:
        draft.loadingPost = false;
        draft.post = [];
        break;
    }
  });

export default newsReducer;
