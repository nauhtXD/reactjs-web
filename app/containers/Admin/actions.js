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

export function getProvinces(data) {
  return {
    type: types.GET_PROVINCE,
    payload: data,
  };
}

export function getCenter(data) {
  return {
    type: types.GET_CENTER,
    payload: data,
  };
}

// #region contact
export function getContacts(data) {
  return {
    type: types.GET_CONTACT,
    payload: data,
  };
}

export function createContact(data) {
  return {
    type: types.CREATE_CONTACT,
    payload: data,
  };
}

export function updateContact(data) {
  return {
    type: types.UPDATE_CONTACT,
    payload: data,
  };
}

export function deleteContact(data) {
  return {
    type: types.DELETE_CONTACT,
    payload: data,
  };
}
// #endregion

// #region HOUSEHOLD
export function getHouseholds(data) {
  return {
    type: types.GET_HOUSEHOLD,
    payload: data,
  };
}

export function createHousehold(data) {
  return {
    type: types.CREATE_HOUSEHOLD,
    payload: data,
  };
}

export function updateHousehold(data) {
  return {
    type: types.UPDATE_HOUSEHOLD,
    payload: data,
  };
}

export function deleteHousehold(data) {
  return {
    type: types.DELETE_HOUSEHOLD,
    payload: data,
  };
}
// #endregion

export function uploadImg(data) {
  return {
    type: types.UPLOAD_IMG,
    payload: data,
  };
}

export function uploadPdf(data) {
  return {
    type: types.UPLOAD_PDF,
    payload: data,
  };
}

export function getLands(data) {
  return {
    type: types.GET_LAND,
    payload: data,
  };
}

export function getGenusFeatures(data) {
  return {
    type: types.GET_GENUS_FEATURE,
    payload: data,
  };
}

// #region PLANT
export function getPlants(data) {
  return {
    type: types.GET_PLANT,
    payload: data,
  };
}

export function createPlant(data) {
  return {
    type: types.CREATE_PLANT,
    payload: data,
  };
}

export function updatePlant(data) {
  return {
    type: types.UPDATE_PLANT,
    payload: data,
  };
}

export function deletePlant(data) {
  return {
    type: types.DELETE_PLANT,
    payload: data,
  };
}
// #endregion

// #region BANNER
export function getBanners(data) {
  return {
    type: types.GET_BANNER,
    payload: data,
  };
}

export function updateBanner(data) {
  return {
    type: types.UPDATE_BANNER,
    payload: data,
  };
}
// #endregion

// #region Document
export function getDocuments(data) {
  return {
    type: types.GET_DOCUMENT,
    payload: data,
  };
}

export function createDocument(data) {
  return {
    type: types.CREATE_DOCUMENT,
    payload: data,
  };
}

export function updateDocument(data) {
  return {
    type: types.UPDATE_DOCUMENT,
    payload: data,
  };
}

export function deleteDocument(data) {
  return {
    type: types.DELETE_DOCUMENT,
    payload: data,
  };
}
// #endregion

export function getDocumentTypes(data) {
  return {
    type: types.GET_DOCUMENT_TYPE,
    payload: data,
  };
}

export function getFields(data) {
  return {
    type: types.GET_FIELD,
    payload: data,
  };
}
