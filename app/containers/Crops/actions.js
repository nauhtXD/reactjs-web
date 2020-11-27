import * as types from './constants';

export function cropsAction({ ...data }) {
  return {
    type: types.DEFAULT_REQUEST,
    payload: data,
  };
}
