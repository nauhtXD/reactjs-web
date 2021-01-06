import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loadingPosts: false,
  posts: [],
};

/* eslint-disable default-case, no-param-reassign */
const newsListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_POST_BY_SCID:
        draft.loadingPosts = true;
        break;
      case types.GET_POST_BY_SCID_SUCCESS:
        draft.posts = action.posts;
        draft.loadingPosts = false;
        break;
      case types.GET_POST_BY_SCID_FAIL:
        draft.posts = [];
        draft.loadingPosts = false;
        break;
    }
  });

export default newsListReducer;
