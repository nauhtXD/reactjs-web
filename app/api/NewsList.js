/* eslint-disable prettier/prettier */
import apiConfig from 'utils/apiConfig';
import * as endpoint from 'utils/endPoint';

export const getPostsBySCID = data =>
  apiConfig.get(`${endpoint.API_ENDPOINT_GET_POST_BY_SCID}/${data}`);
