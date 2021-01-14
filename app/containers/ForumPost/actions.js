import * as types from './constants';

export function forumPostAction({ ...data }) {
  return {
    type: types.DEFAULT_REQUEST,
    payload: data,
  };
}
