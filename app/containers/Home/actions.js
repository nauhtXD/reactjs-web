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

export function getLastestDocuments(data) {
  return {
    type: types.GET_LASTEST_DOCUMENT,
    payload: data,
  };
}

export function createProblem(data) {
  return {
    type: types.CREATE_PROBLEM,
    payload: data,
  };
}

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

export function getLoginToken(data) {
  return {
    type: types.GET_LOGIN_TOKEN,
    payload: data,
  };
}

export function getBanners(data) {
  return {
    type: types.GET_BANNER,
    payload: data,
  };
}

export function checkToken(data) {
  return {
    type: types.CHECK_TOKEN,
    payload: data,
  };
}
