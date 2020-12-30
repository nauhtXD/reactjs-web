import apiConfig from 'utils/apiConfig';
import apiConfig2 from 'utils/apiConfig2';
import * as endpoint from 'utils/endPoint';
export const getWeathers = data =>
  apiConfig2.get(`group?id=${data.data}&lang=vi&appid=${data.key}`);
export const getCityList = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_CITY_LIST);
export const getPosGeo = () => apiConfig.get(endpoint.API_ENDPOINT_GET_POS_GEO);
