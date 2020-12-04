import apiConfig from 'utils/apiConfig';
import * as endpoint from 'utils/endPoint';
export const getUsers = () => apiConfig.get(endpoint.API_ENDPOINT_GET_USER);
export const createUser = data =>
  apiConfig.post(endpoint.API_ENDPOINT_GET_USER, data);
export const getUserTypes = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_USER_TYPE);
export const createPost = data =>
  apiConfig.post(endpoint.API_ENDPOINT_GET_POST, data);
export const getSubCategories = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_SUB_CATEGORY);
