import * as types from './constants';

export function homeAction({ ...data }) {
  return {
    type: types.DEFAULT_REQUEST,
    payload: data,
  };
}
