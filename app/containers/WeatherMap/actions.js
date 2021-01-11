import * as types from './constants';

export function getPosGeo(data) {
  return {
    type: types.GET_POS_GEO,
    payload: data,
  };
}

export function countEpidemics(data) {
  return {
    type: types.COUNT_EPIDEMIC,
    payload: data,
  };
}
