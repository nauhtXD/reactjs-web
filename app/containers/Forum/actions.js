import * as types from './constants';

export function forumAction({ ...data }) {
  return {
    type: types.DEFAULT_REQUEST,
    payload: data,
  };
}
