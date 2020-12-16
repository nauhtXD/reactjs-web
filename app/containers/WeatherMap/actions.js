import * as types from './constants';

export function getWeathers(data) {
  return {
    type: types.GET_WEATHER,
    payload: data,
  };
}

export function getContacts(data) {
  return {
    type: types.GET_CONTACT,
    payload: data,
  };
}
