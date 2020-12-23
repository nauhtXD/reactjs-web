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
export const createPost = data =>
  apiConfig.post(endpoint.API_ENDPOINT_GET_POST, data);
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
