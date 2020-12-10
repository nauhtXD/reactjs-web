import * as types from './constants';

export function getFamilies(data) {
  return {
    type: types.GET_FAMILY,
    payload: data,
  };
}

export function getGenera(data) {
  return {
    type: types.GET_GENUS,
    payload: data,
  };
}

export function getGenusFeatures(data) {
  return {
    type: types.GET_GENUS_FEATURE,
    payload: data,
  };
}

export function getNew(data) {
  return {
    type: types.GET_NEW,
    payload: data,
  };
}
