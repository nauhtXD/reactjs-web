import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loadingForumComments: false,
  forumComments: [],
  loadingForumPost: false,
  forumPost: [],
};

/* eslint-disable default-case, no-param-reassign */
const forumPostReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_FORUM_COMMENT:
        draft.loadingForumComments = true;
        break;
      case types.GET_FORUM_COMMENT_SUCCESS:
        draft.loadingForumComments = false;
        draft.forumComments = action.forumComments;
        break;
      case types.GET_FORUM_COMMENT_FAIL:
        draft.loadingForumComments = false;
        draft.forumComments = [];
        break;
      case types.GET_FORUM_POST:
        draft.loadingForumPost = true;
        break;
      case types.GET_FORUM_POST_SUCCESS:
        draft.loadingForumPost = false;
        draft.forumPost = action.forumPost;
        break;
      case types.GET_FORUM_POST_FAIL:
        draft.loadingForumPost = false;
        draft.forumPost = [];
        break;
    }
  });

export default forumPostReducer;
