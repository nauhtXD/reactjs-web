import apiConfig from 'utils/apiConfig';
import * as endpoint from 'utils/endPoint';
export const getCategories = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_CATEGORY);
export const getSubCategories = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_SUB_CATEGORY);
export const getHeadquarters = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_HEADQUARTERS_CONTACT);
export const getMarks = () => apiConfig.get(endpoint.API_ENDPOINT_GET_MARK);
export const getLastestPosts = data =>
  apiConfig.get(`${endpoint.API_ENDPOINT_GET_LASTEST_POST}/${data}`);
