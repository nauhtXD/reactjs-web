/*
 *
 * Home actions
 *
 */

import * as types from './constants';

export function getCategories(data) {
  return {
    type: types.GET_CATEGORY,
    payload: data,
  };
}

export function getSubCategories(data) {
  return {
    type: types.GET_SUB_CATEGORY,
    payload: data,
  };
}
