import * as types from './constants';

export function getWeathers(data) {
  return {
    type: types.GET_WEATHER,
    payload: data,
  };
}

export function getCityList(data) {
  return {
    type: types.GET_CITY_LIST,
    payload: data,
  };
}

export function getPosGeo(data) {
  return {
    type: types.GET_POS_GEO,
    payload: data,
  };
}
