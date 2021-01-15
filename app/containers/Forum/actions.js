import * as types from './constants';

export function getForumPosts(data) {
  return {
    type: types.GET_FORUM_POST,
    payload: data,
  };
}

export function createForumPost(data) {
  return {
    type: types.CREATE_FORUM_POST,
    payload: data,
  };
}
