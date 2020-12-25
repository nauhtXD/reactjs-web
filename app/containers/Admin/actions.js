/*
 *
 * Admin actions
 *
 */

import * as types from './constants';

// #region user
export function getUsers(data) {
  return {
    type: types.GET_USER,
    payload: data,
  };
}

export function createUser(data) {
  return {
    type: types.CREATE_USER,
    payload: data,
  };
}

export function updateUser(data) {
  return {
    type: types.UPDATE_USER,
    payload: data,
  };
}

export function deleteUser(data) {
  return {
    type: types.DELETE_USER,
    payload: data,
  };
}

export function getUserTypes(data) {
  return {
    type: types.GET_USER_TYPE,
    payload: data,
  };
}
// #endregion

// #region post
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

export function updatePost(data) {
  return {
    type: types.UPDATE_POST,
    payload: data,
  };
}

export function deletePost(data) {
  return {
    type: types.DELETE_POST,
    payload: data,
  };
}
// #endregion

export function getSubCategories(data) {
  return {
    type: types.GET_SUB_CATEGORY,
    payload: data,
  };
}

export function getStatuses(data) {
  return {
    type: types.GET_STATUS,
    payload: data,
  };
}

// #region problem
export function getProblems(data) {
  return {
    type: types.GET_PROBLEM,
    payload: data,
  };
}

export function updateProblem(data) {
  return {
    type: types.UPDATE_PROBLEM,
    payload: data,
  };
}

export function deleteProblem(data) {
  return {
    type: types.DELETE_PROBLEM,
    payload: data,
  };
}
// #endregion
