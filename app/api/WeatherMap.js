import apiConfig from 'utils/apiConfig';
import apiConfig2 from 'utils/apiConfig2';
import * as endpoint from 'utils/endPoint';
export const getCategories = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_CATEGORY);
export const getSubCategories = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_SUB_CATEGORY);
export const getContacts = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_HEADQUARTERS_CONTACT);
export const getMarks = () => apiConfig.get(endpoint.API_ENDPOINT_GET_MARK);
export const getWeather = data =>
  apiConfig2.get(`group?id=${data.citiesId}&lang=vi&appid=${data.key}`);
