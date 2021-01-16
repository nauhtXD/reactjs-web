/* eslint-disable prettier/prettier */
import apiConfig from 'utils/apiConfig';
import apiConfig2 from 'utils/apiConfig2';
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
export const getLastestPosts = () =>
  apiConfig.get(`${endpoint.API_ENDPOINT_GET_LASTEST_POST}/all`);
export const createProblem = data =>
  apiConfig.post(endpoint.API_ENDPOINT_GET_PROBLEM, data);
export const getLastestDocuments = data =>
  apiConfig.get(`${endpoint.API_ENDPOINT_GET_LASTEST_DOCUMENT}/${data}`);
export const getWeathers = data =>
  apiConfig2.get(`group?id=${data.data}&lang=vi&appid=${data.key}`);
export const getCityList = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_CITY_LIST);
export const getLoginToken = data =>
  apiConfig.post(endpoint.API_ENDPOINT_GET_LOGIN_TOKEN, data);
// banner
export const getBanners = () => apiConfig.get(endpoint.API_ENDPOINT_GET_BANNER);
// token
export const checkToken = data =>
  apiConfig.get(`${endpoint.API_ENDPOINT_CHECK_TOKEN}/${data}`);
// user
export const updateUser = data =>
  apiConfig.put(`${endpoint.API_ENDPOINT_UPDATE_USER}/${data.id}`, data);