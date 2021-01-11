/* eslint-disable prettier/prettier */
import apiConfig from 'utils/apiConfig';
// import apiConfig2 from 'utils/apiConfig2';
import * as endpoint from 'utils/endPoint';
export const getPosGeo = () => apiConfig.get(endpoint.API_ENDPOINT_GET_POS_GEO);
export const countEpidemics = () =>
  apiConfig.get(endpoint.API_ENDPOINT_COUNT_EPIDEMIC);
