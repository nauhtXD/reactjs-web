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

export function getHeadquarters(data) {
  return {
    type: types.GET_HEADQUARTERS_CONTACT,
    payload: data,
  };
}

export function getMarks(data) {
  return {
    type: types.GET_MARK,
    payload: data,
  };
}

export function getLastestPosts(data) {
  return {
    type: types.GET_LASTEST_POST,
    payload: data,
  };
}

export function getLastestPostsBSC(data) {
  return {
    type: types.GET_LASTEST_POST_BSC,
    payload: data,
  };
}
