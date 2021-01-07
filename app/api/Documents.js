/* eslint-disable prettier/prettier */
import apiConfig from 'utils/apiConfig';
import * as endpoint from 'utils/endPoint';
export const getDocuments = () =>
  apiConfig.get(endpoint.API_ENDPOINT_GET_DOCUMENT);
export const getInformation = data =>
  apiConfig.get(`${endpoint.API_ENDPOINT_GET_DOCUMENT}/${data}`);
