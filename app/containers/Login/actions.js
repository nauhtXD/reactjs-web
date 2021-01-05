import * as types from './constants';

export function getLoginToken(data) {
  return {
    type: types.GET_LOGIN_TOKEN,
    payload: data,
  };
}
