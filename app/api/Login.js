/* eslint-disable prettier/prettier */
import apiConfig from 'utils/apiConfig';
import * as endpoint from 'utils/endPoint';

export const getLoginToken = data =>
  apiConfig.post(endpoint.API_ENDPOINT_GET_LOGIN_TOKEN, data);
