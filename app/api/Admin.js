import apiConfig from 'utils/apiConfig';
import * as endpoint from 'utils/endPoint';
export const getUsers = () => apiConfig.get(endpoint.API_ENDPOINT_GET_USER);

export const createPost = data => {
  console.log(data);
  return apiConfig.post(endpoint.API_ENDPOINT_GET_POST, data);
};
export const getSubCategories = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_SUB_CATEGORY);
