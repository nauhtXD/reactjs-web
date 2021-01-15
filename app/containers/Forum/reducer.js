import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loadingForumPosts: false,
  forumPosts: [],
};

/* eslint-disable default-case, no-param-reassign */
const forumReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_FORUM_POST:
        draft.loadingForumPosts = true;
        break;
      case types.GET_FORUM_POST_SUCCESS:
        draft.loadingForumPosts = false;
        draft.forumPosts = action.forumPosts;
        break;
      case types.GET_FORUM_POST_FAIL:
        draft.loadingForumPosts = false;
        draft.forumPosts = [];
        break;
    }
  });

export default forumReducer;
