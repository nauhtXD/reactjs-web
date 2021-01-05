import * as types from './constants';

export function getPostsBySCID(data) {
  return {
    type: types.GET_POST_BY_SCID,
    payload: data,
  };
}
