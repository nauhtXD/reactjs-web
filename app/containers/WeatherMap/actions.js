import * as types from './constants';

export function getWeather(data) {
  return {
    type: types.GET_WEATHER,
    payload: data,
  };
}
