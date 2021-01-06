/* eslint-disable prettier/prettier */
import apiConfig from 'utils/apiConfig';
import * as endpoint from 'utils/endPoint';
export const getCategories = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_CATEGORY);
export const getSubCategories = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_SUB_CATEGORY);
export const getSubCategoriesByCID = data =>
  apiConfig.get(`${endpoint.API_ENDPOINT_GET_SUB_CATEGORY_BY_CID}/${data}`);
export const getContacts = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_CONTACT);
export const getLastestPostsBySCID = data =>
  apiConfig.get(
    `${endpoint.API_ENDPOINT_GET_LASTEST_POST}/${data.subId}/${data.limit}`,
  );
export const getLastestPosts = data =>
  apiConfig.get(`${endpoint.API_ENDPOINT_GET_LASTEST_POST}/${data}`);
