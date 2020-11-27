/*
 *
 * Admin actions
 *
 */

import * as types from './constants';

export function getUsers(data) {
  return {
    type: types.GET_USER,
    payload: data,
  };
}
