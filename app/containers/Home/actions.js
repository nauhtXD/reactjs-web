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

export function getSubCategoriesByCID(data) {
  return {
    type: types.GET_SUB_CATEGORY_BY_CID,
    payload: data,
  };
}

export function getContacts(data) {
  return {
    type: types.GET_CONTACT,
    payload: data,
  };
}

export function getLastestPosts(data) {
  return {
    type: types.GET_LASTEST_POST,
    payload: data,
  };
}

export function getLastestPostsBySCID(data) {
  return {
    type: types.GET_LASTEST_POST_BY_SCID,
    payload: data,
  };
}

export function getLastestPostsBSC(data) {
  return {
    type: types.GET_LASTEST_POST_BSC,
    payload: data,
  };
}
