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

export function getContacts(data) {
  return {
    type: types.GET_CONTACT,
    payload: data,
  };
}

export function getMarks(data) {
  return {
    type: types.GET_MARK,
    payload: data,
  };
}

export function getPosts(data) {
  return {
    type: types.GET_POST,
    payload: data,
  };
}
