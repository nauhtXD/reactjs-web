import apiConfig from 'utils/apiConfig';
import * as endpoint from 'utils/endPoint';
export const getCategories = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_CATEGORY);
export const getSubCategories = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_SUB_CATEGORY);
export const getContacts = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_CONTACT);
export const getLastestPosts = data =>
  apiConfig.get(`${endpoint.API_ENDPOINT_GET_LASTEST_POST}/${data}`);
