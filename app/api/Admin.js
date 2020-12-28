import apiConfig from 'utils/apiConfig';
import * as endpoint from 'utils/endPoint';
// user
export const getUsers = () => apiConfig.get(endpoint.API_ENDPOINT_GET_USER);
export const createUser = data =>
  apiConfig.post(endpoint.API_ENDPOINT_GET_USER, data);
export const updateUser = data =>
  apiConfig.put(`${endpoint.API_ENDPOINT_UPDATE_USER}/${data.id}`, data);
export const deleteUser = data =>
  apiConfig.put(`${endpoint.API_ENDPOINT_DELETE_USER}/${data}`, data);
export const getUserTypes = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_USER_TYPE);
// post
export const getPosts = () => apiConfig.get(endpoint.API_ENDPOINT_GET_POST);
export const createPost = data =>
  apiConfig.post(endpoint.API_ENDPOINT_GET_POST, data);
export const updatePost = data =>
  apiConfig.put(`${endpoint.API_ENDPOINT_UPDATE_POST}/${data.id}`, data);
export const deletePost = data =>
  apiConfig.put(`${endpoint.API_ENDPOINT_DELETE_POST}/${data}`, data);
// subcategory
export const getSubCategories = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_SUB_CATEGORY);
// status
export const getStatuses = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_STATUS);
// problem
export const getProblems = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_PROBLEM);
export const updateProblem = data =>
  apiConfig.put(`${endpoint.API_ENDPOINT_UPDATE_PROBLEM}/${data.id}`, data);
export const deleteProblem = data =>
  apiConfig.put(`${endpoint.API_ENDPOINT_DELETE_PROBLEM}/${data}`, data);
// province
export const getProvinces = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_PROVINCE);
export const getCenter = data =>
  apiConfig.get(`${endpoint.API_ENDPOINT_GET_PROVINCE}/${data}`);
// contact
export const getContacts = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_CONTACT);
export const createContact = data =>
  apiConfig.post(endpoint.API_ENDPOINT_GET_CONTACT, data);
export const updateContact = data =>
  apiConfig.put(`${endpoint.API_ENDPOINT_UPDATE_CONTACT}/${data.id}`, data);
export const deleteContact = data =>
  apiConfig.put(`${endpoint.API_ENDPOINT_DELETE_CONTACT}/${data}`, data);
