import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loadingPost: false,
  post: [],
  loadingComments: false,
  comments: [],
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
      case types.GET_COMMENT:
        draft.loadingComments = true;
        break;
      case types.GET_COMMENT_SUCCESS:
        draft.loadingComments = false;
        draft.comments = action.comments;
        break;
      case types.GET_COMMENT_FAIL:
        draft.loadingComments = false;
        draft.comments = [];
        break;
    }
  });

export default newsReducer;
