import apiConfig from 'utils/apiConfig';
import * as endpoint from 'utils/endPoint';
export const getPost = data =>
  apiConfig.get(`${endpoint.API_ENDPOINT_GET_POST}/${data}`);
export const getCategories = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_CATEGORY);
export const getSubCategories = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_SUB_CATEGORY);
export const getComments = data =>
  apiConfig.get(`${endpoint.API_ENDPOINT_GET_COMMENT}/${data}`);
export const createComment = data =>
  apiConfig.post(endpoint.API_ENDPOINT_GET_COMMENT, data);
