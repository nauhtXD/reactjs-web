import * as types from './constants';

export function introduceAction({ ...data }) {
  return {
    type: types.DEFAULT_REQUEST,
    payload: data,
  };
}
