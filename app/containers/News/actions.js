import * as types from './constants';

export function getPost(data) {
  return {
    type: types.GET_POST,
    payload: data,
  };
}
