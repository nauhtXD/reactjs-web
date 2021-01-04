import * as types from './constants';

export function getPost(data) {
  return {
    type: types.GET_POST,
    payload: data,
  };
}

export function getComments(data) {
  return {
    type: types.GET_COMMENT,
    payload: data,
  };
}

export function createComment(data) {
  return {
    type: types.CREATE_COMMENT,
    payload: data,
  };
}
