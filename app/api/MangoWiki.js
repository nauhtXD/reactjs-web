import apiConfig from 'utils/apiConfig';
import * as endpoint from 'utils/endPoint';

export const getFamilies = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_FAMILY);
export const getGenera = () => apiConfig.get(endpoint.API_ENDPOINT_GET_GENUS);
export const getGenusFeatures = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_GENUS_FEATURE);
export const getNew = data => apiConfig.get(`${data}`);
