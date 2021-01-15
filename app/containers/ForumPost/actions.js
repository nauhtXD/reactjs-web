import * as types from './constants';

export function getForumComments(data) {
  return {
    type: types.GET_FORUM_COMMENT,
    payload: data,
  };
}

export function createForumComment(data) {
  return {
    type: types.CREATE_FORUM_COMMENT,
    payload: data,
  };
}

export function getForumPost(data) {
  return {
    type: types.GET_FORUM_POST,
    payload: data,
  };
}
