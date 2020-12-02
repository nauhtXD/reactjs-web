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

export function getPosts(data) {
  return {
    type: types.GET_POST,
    payload: data,
  };
}

export function createPost(data) {
  return {
    type: types.CREATE_POST,
    payload: data,
  };
}

export function getSubCategories(data) {
  return {
    type: types.GET_SUB_CATEGORY,
    payload: data,
  };
}
