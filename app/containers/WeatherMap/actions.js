import * as types from './constants';

export function getPosGeo(data) {
  return {
    type: types.GET_POS_GEO,
    payload: data,
  };
}
